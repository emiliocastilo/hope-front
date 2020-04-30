# hopes-front

Frontal de hopes.

# Configuración inicial

1. Descargar el repositorio
`git clone https://repo.plexus.services/desarrollo/1187-001-hope/hope-front.git`
2. Instala NPM
https://nodejs.org/en/
3. Instala Angular CLI
`npm install -g @angular/cli`
4. Descarga e instala las dependencias del proyecto
`npm install`
5. Si todo está bien se puede ejecutar `ng build --configuration=preproduction` y creará una carpeta dist con la web configurada para desplegar en preproducción


# Iniciar nuevo desarrollo

1. Cambiar a rama **develop**
2. Pull
3. Crear nueva rama **feature/###**
4. Desarrollo de la nueva funcionalidad
6. Pull request a rama **release/x.x.x+1** (si no existe, crearla)


# Preparar pase a producción

1. Checkout a rama **release/x.x.x+1**
2. Pull
3. Prepara y comprobar que la en la rama **release/x.x.x+1** esté todo correcto
4. Subir los cambios de la rama release a origin
5. Pull request de la rama de release a development
6. Desplegar los cambios de esta versión de test (staging) -Si disponemos de el-
`ng build --configuration=preproduction`
7. Pruebas en entorno de test (revisión de que la funcionalidad a subir no rompa nada)
8. Desplegar los cambios de esta versión a producción
`ng build --configuration=production`
9. Commit y push de los cambios en la rama release
10. Pull request de la rama de release a master


# Fromato y reglas de Lint
Los archivos .ts y .html seran revisados y formateador por prettier (https://prettier.io/) bajo las reglas estandar de prettire excepto por las reglas escritas en el archivo: .prettierrc 
* npm run lint (revisa el formato de todos los archivos ts y html). 
* npm run reformat:ts (revisa y modifica los archivos ts). 
* npm run reformat:html (revisa y modifica los archivos html).

# Fromato y reglas de Stylelint
Los archivos scss (sass) seran revisados y formateados por Stylelint (https://stylelint.io/) bajo la configuración "stylelint-config-standard" excepto por las reglas reglas escritas en .stylelintrc.json 
* npm run stylelint (revisa el formato de todos los archivos scss). 
* npm run reformat:scss (revisa y modifica los archivos scss)

# AngularDevelopmentCLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).