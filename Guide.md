## Que es webpack  *"module bundler"*

Es una herramienta que nos permite preparar nuestro código para su salida a producción, nos permite trabajar de manera modular nuestro código, a menara de generar un paquete para nuestra aplicacion. 

## Conceptos básicos

- Construye un grafico de dependencias que mapea cada modulo para convertirlo en uno o mas módulos. 
- Podemos estandarizar una forma de trabajo. 
- Dentro de la carpeta *dist* se suelen agrupar los componentes sintetizados de webpacks. 
- Podemos utilizar loaders y plugins. 

## Configuracion de proyecto

Inicializamos un proyecto nuevo de npm	

```
npm init
```

Instalamos webpack y webpack cli como dependencias de desarrollo	

```
npm install webpack webpack-cli -D
```

### Inicializar el ambiente de producción

```
npx webpack
```

> Esto identifica nuestro punto de partida en este caso *src/index.js* y nos genera nuestra carpeta dist de distribution.

### Inicializar el ambiente de pruebas

Activa una vista especial dentro del *dist/main.js*

``````
npx webpack --mode development
``````

Webpack optimiza nuestra código cuando esta configurado en ambiente productivo, y en ambiente de desarrollo nos muestra el proceso de como se esta ejecutando nuestro javascript internamente junto a esa optimización. 

## Construcción de un proyecto con webpack

Instalamos webpack sobre el proyecto

```
npm install webpack webpack-cli -D
```

Cuando utilizamos, se utiliza la configuración por defecto de webpack

```
npx webpack --mode production
npx webpack --mode development
```

### Configuracion del archivo *webpack.config.js*

```js
const path = require("path"); // Traemos path para que nos ayude a armar una ruta dinamica de lo que seria la salida del proyecto. 

module.export = {
    entry: "./src/index.js", // Indicamos el punto de entrada
    output: { // Configuramos el punto de salida 
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    }, 
    resolve: { // Dentro de resolve vamos a especificar con que tipo de archivos vamos a trabajar
        extensions: [".js"]
    }
}
```

Para poder utilizar el set de configuración

```
npx webpack --mode production --config webpack.config.js
```

Podemos crear shortcuts en el package.json 

```
"build" : "webpack --mode production"
```

### Implementación de  babel loader , para optimización

Esta implementación optimiza el código y la hace compatible con todos los navegadores disponibles. 

```
npm install babel-loader 
@babel/core ## Core de babel
@babel/preset-env ## Trabajar con variables de entorno
@babel/plugin-transform-runtime ## Trabajar con Asincronismo
-D
```

Generamos el archivo *.babelrc* e indicamos los presets y plugins a utilizar 

```json
{
    "presets": [
        "@babel/preset-env"
    ], 
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

Luego para conectar babel lo hacemos a través de webpack

```js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, // Expresion regular para incluir extensiones .js y .m
            exclude: /node_modules/, // Exxluimos a la carpeta node_modules
            use: {
                loader: "babel-loader" // Especificamos el loader
            }
        }
    ]}
}
```

### HTML con webpack

```
npm install html-webpack-plugin -D
```

Para adicionar el plugin de html a webpack realizamos lo siguiente

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
// Traemos al proyecto el plugin posterior a la instalacion

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, // Para que pueda inyectar el codigo
            template:'./public/index.html', // Donde lo va a sacar
            filename: './index.html' //Como se llamara el archivo generado
        })
    ]
}
```

## Loaders para CSS y pre-procesadores

Vamos a utilizar un loader para css y un plugin. 

```
npm install mini-css-extract-plugin css-loader -D
```

Ahora debemos de llamar a nuestros distintos recursos de css para que los lea desde el archivo principal.

```js
// Dentro de index.js

import './styles/main.css';
```

 Luego realizamos las configuraciones necesarias dentro del archivo de webpack.config.js

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

// Realizamos la llamada del plugin 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, // Agregamos una nueva regla, con su expresion regular para identificar archivos css. 
        {
            test: /\.css$/i,
            use: [ // Identificamos el loader a utilizar 
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin(), // Inicializamos el lodaer como plugin
    ]
}
```

Luego de esto deberíamos ver que al momento de compilar ya tenemos los archivos cargados los estilos de css. 

### Como trabajar con pre-procesadores de css

Los preprocesadores de css son herramientas que nos ayudan a generar código de css de una manera mas rápida. 

```
npm install stylus stylus-loader
```

Luego debemos de agregar las configuraciones necesarias a webpack.config.js

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, 
        {
            test: /\.css|.styl$/i, //Agregamos la extension a la expresion regular 
            use: [ 
                MiniCssExtractPlugin.loader, 
                'css-loader', 
                'stylus-loader' // Lo agregamos dentro de los loaders que utilizaremos
            ]
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin(),
    ]
}
```

## Copia de archivos con webpack

Cuando se tenga la necesidad de mover un recurso de src hacia dist (distribution). 

```
npm install copy-webpack-plugin -D
```

Esto para que los recursos de imágenes carguen directamente del dist, para ello debemos apuntar cualquier recurso de imagen local hacia por ejemplo "assets/images", luego de ello agregamos la configuración del plugin a nuestro proyecto. 

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Llamamos al plugin de copia de archivos 
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin(),
        // Configuramos el plugin de copia y le indicamos el movimiento de archivos a ejecutar
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"), 
                    to: "assets/images"
                }
            ]
        })
    ]
}
```

### Pasar los recursos de imágenes a base64 loader de images 

No basta con mover nuestros recursos de imágenes a la carpeta de distribution, ya que estos recursos pueden llegar a ocupar mucho espacio, por lo tanto se convertirán a un formato de base64, con un loader de images. 

```js
// Agregamos las llamadas de imagenes como variables

import github from "../assets/images/github.png";
import twitter from "../assets/images/twitter.png";
import instagram from "../assets/images/instagram.png";
```

Luego agregamos la configuración necesaria a webpack.config.js

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js"
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.png/, // Aca podemos agregar mas extensiones de imagenes 
            type: "asset/resource" // con este recurso de webpack podemos omitir el modulo de copia 
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"), 
                    to: "assets/images"
                }
            ]
        })
    ]
}
```

## Loaders de fuentes 

Del mismo modo que con las imágenes se necesitan optimizar las fonts que utilizamos en nuestra pagina, por lo tanto en este caso tenemos la llamada de la siguiente manera. 

```css
@import "https://fonts.googleapis.com/css?family=Ubuntu:300,400,500";
```

Para ello debemos de descargar la fuente en formato woff y woff2. 

```css
@font-face {
	font-family: 'Ubuntu';
	src: url(../assets/fonts/ubuntu-regular.woff2) format('woff2'), 
	url(../assets/fonts/ubuntu-regular.woff) format('woff');
	font-weight: 400;
	font-style: normal;
}
```

Ahora necesitamos copiar de assets hacia distribution los archivos de fonts para ello realizamos lo siguiente

```
npm install url-loader file-loader -D
```

Podemos eliminar método anterior para imágenes

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            use: {
                loader: 'url-loader', 
                options: {
                    limit: 10000, 
                    mimetype: "application/font-woff",
                    name: "[name].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts", 
                    esModule: false
                }
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin(),
    ]
}
```



## Optimización: hashes, compresión y minificación de archivos

Debemos de minificar nuestros recursos, por lo tanto haremos uso de los siguientes plugins:

- css-minimizer
- Terser webpack plugin para javascript

```
npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
```

dentro de nuestro archivo de webpack.config.js agregamos el objeto de optimizer

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Importamos los plugins 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js"]
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            use: {
                loader: 'url-loader', 
                options: {
                    limit: 10000, 
                    mimetype: "application/font-woff",
                    name: "[name].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts", 
                    esModule: false
                }
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin()
    ], 
    // Agregamos el objeto de optimization
    optimization: {
        minimize: true, 
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()           
        ]
    }
}
```

## Webpack Alias

Nos permite identificar de mejor manera los recursos que utilizamos al momento de realizar un import, por lo tanto en el apartado de result vamos a agregar lo siguiente:

```js
resolve: {
        extensions: [".js"], 
        alias: { // agregamos alias para las rutas
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@templates": path.resolve(__dirname, 'src/templates'),
            "@styles": path.resolve(__dirname, 'src/styles'),
            "@images": path.resolve(__dirname, 'src/assets/images')
        }
    }, 
```

## Deploy de un proyecto

### Variables de entorno

Lo primero que debemos hacer es instalar una dependencias que nos ayude a utilizar variables de entorno

```
npm install dotenv-webpack -D
```

Luego creamos dos archivos *.env* y *.env-examples* para poder almacenar la especificacion y nuestras variables de entorno como tal. 

*.env*

```
API=https://randomuser.me/api/
```

*.env-examples*

```
API=
```

Para terminar agregamos el plugin a nuestra configuración de webpack.config.js

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// Agregamos el import del plugin 
const DotEnv = require("dotenv-webpack")


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js"], 
        alias: {
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@templates": path.resolve(__dirname, 'src/templates'),
            "@styles": path.resolve(__dirname, 'src/styles'),
            "@images": path.resolve(__dirname, 'src/assets/images')
        }
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: "assets/[name][contenthash].css"
        }),
        new DotEnv(), // Agregamos el nuevo plugin				
    ], 
    optimization: {
        minimize: true, 
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()           
        ]
    }
}
```

### Webpack en modo desarrollo 

Tener un archivo propio de configuraciones para desarrollo. 

Generamos el archivo *webpack.config.dev.js* 

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotEnv = require("dotenv-webpack");


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: "development",
    resolve: {
        extensions: [".js"], 
        alias: {
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@templates": path.resolve(__dirname, 'src/templates'),
            "@styles": path.resolve(__dirname, 'src/styles'),
            "@images": path.resolve(__dirname, 'src/assets/images')
        }
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: "assets/[name][contenthash].css"
        }),
        new DotEnv()
    ], 
    
}
```

> Por lo general le retiramos aspectos relacionados con la optimización, para tener una visualización mejor de nuestro código y poder realizar un debbugin correcto. 

### webpack en modo producción 

Para el modo producción podemos adicionar una herramienta para limpiar nuestra salida en este caso la carpeta de dist. 

```
npm install clean-webpack-plugin -D
```

Luego agregamos el plugin a nuestra configuración de webpack

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DotEnv = require("dotenv-webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "[name][contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: "production",
    resolve: {
        extensions: [".js"], 
        alias: {
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@templates": path.resolve(__dirname, 'src/templates'),
            "@styles": path.resolve(__dirname, 'src/styles'),
            "@images": path.resolve(__dirname, 'src/assets/images')
        }
    }, 
    module: {
        rules: [
        {
            test: /\.m?js$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }, 
        {
            test: /\.(png|svg|jpg|jpeg|gif)/, 
            type: "asset/resource",
        }, 
        {
            test: /\.(woff|woff2)$/, 
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
            }
        }
    ]},
    plugins: [
        new htmlWebpackPlugin({
            inject: true, 
            template:'./public/index.html', 
            filename: './index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: "assets/[name][contenthash].css"
        }),
        new DotEnv(),
    ], 
    optimization: {
        minimize: true, 
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(), 
            new CleanWebpackPlugin()      
        ]
    }
}
```

### webpack watch 

Esta opción nos permite detectar los cambios dentro de nuestro proyecto. 



























