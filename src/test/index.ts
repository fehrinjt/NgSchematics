import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { LcForm } from './models/form.model';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function test(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const { path } = _options;
    const contents = tree.read(path);

    if (contents) {
      const sourceTemplates = url('./files');

      const form = <LcForm>JSON.parse(contents.toString());

      const sourceParamTemplates = apply(sourceTemplates, [
        template({
          form
        })
      ]);

      return mergeWith(sourceParamTemplates);
    }
    
    return tree;
  };
}
