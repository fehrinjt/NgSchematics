import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { FormProperty } from './form-property.interface';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function test(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const { path } = _options;
    const contents = tree.read(path);

    if (contents) {
      const sourceTemplates = url('./files');

      const props = <FormProperty[]>JSON.parse(contents.toString());

      const sourceParamTemplates = apply(sourceTemplates, [
        template({
          props
        })
      ]);

      return mergeWith(sourceParamTemplates);
    }
    
    return tree;
  };
}
