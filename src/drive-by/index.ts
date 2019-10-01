import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { LcForm } from './models/form.model';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function driveBy(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const { path, name } = _options;
    console.log(_options);
    const contents = tree.read(path);
    if (contents) {
      const sourceTemplates = url('./files');

      const form = <LcForm>JSON.parse(contents.toString());

      const sourceParamTemplates = apply(sourceTemplates, [
        template({
          form,
          name,
          ...strings
        })
      ]);

      return mergeWith(sourceParamTemplates);
    }
    
    return tree;
  };
}
