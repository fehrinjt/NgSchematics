import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, move, chain, SchematicsException } from '@angular-devkit/schematics';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { buildRelativePath, findModule } from '@schematics/angular/utility/find-module';
import { addDeclarationToModule, addEntryComponentToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import * as ts from 'typescript';
import { InsertChange } from '@schematics/angular/utility/change';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function driveBy(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      // throw new SchematicsException('Not an Angular CLI workspace');
      const sourceTemplates = url('./files');

      const { name } = _options;

      const sourceParamTemplates = apply(sourceTemplates, [
        template({
          name,
          ...strings
        })
      ]);

      return mergeWith(sourceParamTemplates)(tree, _context);
    } else {
      const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
      const projectName = _options.project || workspaceConfig.defaultProject;
      const project = workspaceConfig.projects[projectName];
      _options.project = projectName;

      const defaultProjectPath = buildDefaultPath(project);

      const parsedPath = parseName(defaultProjectPath, _options.name);

      const { name, path } = parsedPath;
      _options.path = path;
      _options.name = name;
      const sourceTemplates = url('./files');

      _options.module = findModule(tree, path);

      const sourceParamTemplates = apply(sourceTemplates, [
        template({
          name,
          ...strings
        }),
        move(path)
      ]);

      return chain([
        addDeclarationToNgModule(_options, 'detail'),
        addDeclarationToNgModule(_options, 'form'),
        addDeclarationToNgModule(_options, 'list'),
        mergeWith(sourceParamTemplates)
      ]);
    }


  };
}

function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');

  return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function addDeclarationToNgModule(options: any, compType: string): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module) {
      return host;
    }

    options.type = !!options.type ? options.type : 'Component';

    const modulePath = options.module;
    const source = readIntoSourceFile(host, modulePath);

    const compTypeDashed = strings.dasherize(compType);
    const compTypeClassed = strings.classify(compType);

    const componentPath = `/${options.path}/`
                          + strings.dasherize(options.name) + 's/'
                          + strings.dasherize(options.name) + '-' + compTypeDashed + '/'
                          + strings.dasherize(options.name) + '-' + compTypeDashed + '.component';


    const relativePath = buildRelativePath(modulePath, componentPath);
    const classifiedName = strings.classify(options.name) + compTypeClassed + 'Component';

    const declarationChanges = addDeclarationToModule(source,
                                                      modulePath,
                                                      classifiedName,
                                                      relativePath);

    const declarationRecorder = host.beginUpdate(modulePath);

    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
      // Need to refresh the AST because we overwrote the file in the host.
      const source = readIntoSourceFile(host, modulePath);

      const exportRecorder = host.beginUpdate(modulePath);
      const exportChanges = addExportToModule(source, modulePath,
                                              classifiedName,
                                              relativePath);

      for (const change of exportChanges) {
        if (change instanceof InsertChange) {
          exportRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(exportRecorder);
    }

    if (options.entryComponent) {
      // Need to refresh the AST because we overwrote the file in the host.
      const source = readIntoSourceFile(host, modulePath);

      const entryComponentRecorder = host.beginUpdate(modulePath);
      const entryComponentChanges = addEntryComponentToModule(
        source, modulePath,
        strings.classify(options.name) + strings.classify(options.type),
        relativePath);

      for (const change of entryComponentChanges) {
        if (change instanceof InsertChange) {
          entryComponentRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(entryComponentRecorder);
    }


    return host;
  };
}

