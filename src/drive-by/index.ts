import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, SchematicsException, move } from '@angular-devkit/schematics';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function driveBy(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.projects[projectName];

    const defaultProjectPath = buildDefaultPath(project);
    
    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;
    // const contents = tree.read(path);
    // const config = tree.read('./tsconfig2.json'); 
    const sourceTemplates = url('./files');

    // const form = <LcForm>JSON.parse(contents.toString());

    /*let configJson = null;
    if (config) {
      configJson = JSON.parse(config.toString());
    }*/

    // TODO: Read in the tsconfig and set something up to read the paths if available for services, environment, etc.
    // const a = Object.keys(configJson.compilerOptions.paths).filter(k => k.toString().includes('service'))[0];
    // console.log(configJson);
    // console.log(a);

    const sourceParamTemplates = apply(sourceTemplates, [
      template({
        name,
        ...strings
      }),
      move(path)
    ]);

    return mergeWith(sourceParamTemplates)(tree, _context);
  };
}
