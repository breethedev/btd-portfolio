// eslint-disable-next-line import/no-anonymous-default-export
export default function (plop) {
  // component files generator includes tsx , css, and md files
  plop.setGenerator("component", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name?",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Component name is required";
        },
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "app/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add",
        path: "app/components/{{pascalCase name}}/{{dashCase name}}.css",
        templateFile: "plop-templates/component.css.hbs",
      },
      {
        type: "add",
        path: "app/components/{{pascalCase name}}/{{pascalCase name}}.md",
        templateFile: "plop-templates/component.md.hbs",
      },
      {
        type: "append",
        path: "app/components/index.ts",
        pattern: /(\/\/ PLOP_INJECT_EXPORTS)\n/g,
        template:
          "export { {{pascalCase name}} } from './{{pascalCase name}}/{{pascalCase name}}';",
      },
    ], // array of actions
  });
}
