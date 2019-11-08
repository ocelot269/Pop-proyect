El pulpo de raza loba
=====================
#### Examen programación Dual Septiembre 2018

De vez en cuando, usualmente entre las 8 y las 10 de la noche, Mariano se transforma en un escurridizo pulpo de gran tamaño con una larga barba blanca, lo que en Galicia llamamos un pulpo de raza loba.

Por un lado, Mariano está agradecido por no sufrir la típica licantropía de los gallegos. En vez de preocuparse por comerse accidentalmente al paisano de al lado, se preocupa de no terminar en la pota los martes en los que hay feria del pulpo en el pueblo.
Tras varias ocasiones en las que se ha despertado aturdido y desnudo entre las rocas de la playa, ha decidido cerrar las puertas de su casa con llave y llenar la bañera con mejillones de la Ría para estar entretenido cuando se transforma.

Pero Mariano está preocupado y quiere solucionar su problema. Sospecha que hay algo que dispara la transformación, ya que no sucede todos los días. Como es un poco _nerd_, decide enfrentarse al problema de manera científica, registrando en un diario lo que hace cada día y anotando si se transformó o no con unos de sus ocho brazos.

Vamos a ayudarle a construir un programa mediante el cual pueda recoger la información que necesita en una estructura de datos, y luego aplicar un algoritmo para averiguar cuál o cuáles de las cosas que hace (caminar, ver la vuelta, beber vino, etc.) produce que se transforme en pulpo.

## Instrucciones

- Crea un **proyecto MAVEN** siguiendo el esquema: org.mvpigs.pulpo

- Realiza **_commits_** periódicamente mientras avanzas en el desarrollo de la aplicación y **publica tu solución en GitHub**.

- Envíame tu proyecto comprimido en un **ZIP** a gelpiorama@gmail.com

- No olvides dibujar a mano alzada el **DIAGRAMA DE CLASES UML** de tu solución para completar la evaluación de la parte práctica de ED. 

## Programa principal y casos test

El programa principal -la función `main()`- está compuesto por las salidas en consola de los casos test que en cada clase se proponen. Ve añadiendo _prints_ de los casos test al programa principal tal y como se indica en cada clase, además de a la suite JUnit.

## I - Clase Registro
Diseña una clase REGISTRO para crear las entradas que conforman el diario de Mariano sobre lo que ha sucedido durante el día.

PROPIEDADES

`eventos`

Colección de strings con la secuencia de eventos que han sucedido a lo largo del día.

`pulpo` 

indica si Mariano se ha convertido en pulpo ese día (verdadero o falso).

MÉTODOS

`contieneEvento(evento, eventos)`

Averigua si el evento que especificamos está en la lista de los eventos que han ocurrido ese día.

`mostrarRegistro()` 

muestra por consola un registro, es decir, qué hizo Mariano ese día y si se ha convertido en pulpo.

Añade aquellos métodos que estimes oportunos para manejar el ADT o tipo de dato abstracto de la clase. 

#### CASOS TEST

Crea un registro con los siguientes datos:
eventos: 
```
trabajar, tocar un árbol, hamburguesa, correr, twitter
pulpo: false
```
Muestra por pantalla toda esta información que has almacenado en el objeto registro de la forma:
```
Test Registro:
eventos: trabajar, tocar un árbol, hamburguesa, correr, twitter
pulpo: false
```

* Comprueba que la longitud del registro es 5. Muéstralo en pantalla.
* Comprueba que el valor de pulpo es false.

* Comprueba que el evento hamburguesa está presente en el registro y muéstralo por pantalla.
* Comprueba que el evento pizza no está presente en el registro y muéstralo por pantalla.


## II - Clase Diario

Diseña una clase DIARIO que recoja los registros que Mariano va guardando en su diario. 

PROPIEDADES

`registros` 

Es un array de objetos de tipo `Registro`.

MÉTODOS

`incluirRegistro(registro)`

Añade un objeto de tipo `Registro` al diario.

`mostrarDiario()` 

Muestra todos los registros del diario por consola, es decir, qué hizo Mariano ese día y si se convirtió en pulpo.

Añade aquellos métodos que necesites para manejar el ADT de la clase.

#### CASOS TEST

Crea un diario que contenga los siguientes registros:

```
trabajar, tocar un árbol, pizza, correr, television => false
trabajar, helado, coliflor, lasaña, tocar un árbol, lavarse los dientes => false
finde, bicicleta, descansar, cacahuetes, cerveza => true
```

Muestra los eventos incluidos en diario de la forma:
```
eventos: trabajar, tocar un árbol, hamburguesa, correr, twitter  => pulpo: false
```

* Comprueba que la longitud del diario es 3. Muéstralo en pantalla.


## III - Clase Correlación

Vamos a averiguar qué factores son los que más inciden en que Mariano se convierta en pulpo.

La Correlación **phi φ** es una medida de la dependencia entre variables (“variables”  en el sentido estadístico, no en el de la programación). Se expresa como un coeficiente cuyo valor cae en el rango de −1 a 1. Correlación 0 significa que las variables no están relacionadas, mientras que correlación 1 significa que las variables están perfectamente relacionadas: si conoces una, conoces el valor de la otra. Correlación con valores negativos, significa que las variables están relacionadas pero que son opuestas: cuando una es cierta, la otra es falsa.

Para variables binarias como el caso de las nuestras (pulpo es verdadero o falso, “descansar” es verdadero o falso), el coeficiente phi (φ) provee una buena medida de la correlación. Para calcularlo, hemos de crear una tabla que contenga el número de veces que se han observado las distintas combinaciones de las variables. Por ejemplo, la tabla para el evento “comer pizza” sería así:

|no pulpo, no pizza|no pulpo, pizza|
|:------------------:|:---------------:|
|76|9|
|**pulpo, no pizza**| **pulpo, pizza** |
|4|1|

Si representas esta tabla en una matriz, obtienes los siguientes índices (posiciones en la matriz):

	     	         Pizza
	     	         False	True
    Pulpo   False    00	01
            True     10	11

phi φ se calcula con la siguiente fórmula, donde n se refiere a los valores que encontramos en cada posición de la matriz (76, 9, 4, 1) y los subíndices son las posiciones de la matriz:

![phi](https://github.com/dfleta/pulpo-raza-loba/blob/master/phi.png "Phi")

Así, la notación `n01` indica el número de medidas donde la primera variable medida -se ha convertido en pulpo o no- es falsa (0) y la segunda medida -ha comido pizza- es verdadero (1). En este ejemplo, `n01` es 9. De igual modo, `n10` es 4, `n00` es 76 y `n11` es 1.

El valor `n1•` se refiere a la suma de todas las medidas donde la primera variable (pizza) es `true`, lo que corresponde a 5 en la tabla ejemplo. 
`n•0` se refiere a la suma de las medidas donde la variable pulpo es `false`, 85.

Por tanto, para la tabla pizza, la parte superior de la división (el dividendo) sería:
```
1×76 − 4x9 = 40
```
y la parte inferior de la división (el divisor) sería la raíz cuadrada de
```
5×85×10×80 = 340000
```
Esto significa que `phi` vale `φ ≈ 0.069`, un valor muy pequeño comparado con 1, lo que significa que comer pizza no parece tener mucha influencia en que se produzca la transformación a pulpo.

#### Clase Correlación

Crea una clase `Correlación` que contenta la tabla con las medidas y la correlación phi entre esas dos variables

PROPIEDADES

`tabla` representa la tabla como una matriz 2x2

`phi` es el valor de la correlación

MÉTODOS

`phi()` 

Es una función que calcula la correlación mediante la fórmula anterior aprtir de la tabla con los datos.

`phi(tabla)`

Es una función que calcula la correlación mediante la fórmula anterior, una vez que le proporcionamos una tabla con los datos.

Aquellos que estimes oportunos para manejar el ADT de la clase. Por ejemplo, mostrar por consola el valor de la correlación para una tabla dada.

#### CASOS TEST

```
phi( 76, 9, 
          4, 1)  devuelve el valor 0.068599434
```

- Muestra por pantalla la matriz 2x2 formateada en un cuadrado y el resultado de la correlación de la forma:
```
[ 76, 9, 4, 1]  => phi = 0.068599434
```

## IV - Clase Tabla

Para crear las tablas de todas la variables (los eventos) del diario de Mariano, debemos realizar un _loop_ sobre todas las entradas del diario y hacer un recuento de cuántas veces sucede un evento en relación a la transformación en pulpo.

Diseña una clase `Tabla`

PROPIEDADES

`matrizEventos`

Representa la tabla como una matriz 2x2

MÉTODOS

`tablaPara(evento, diario)`

Esta función recibe el evento para el cual queremos calcular la correlación y el `diario` y almacena en `matrizEventos` la tabla del como una matriz 2x2.

La lógica es la siguiente: 

Recorre el `diario`. Para cada `registro` del diario:

- Si NO se encuentra el evento indicado entre los eventos del `registro` y Mariano NO se ha convertido en pulpo, se suma 1 a la posición `00` de la tabla.
- Si se encuentra el evento indicado entre los eventos del `registro` y Mariano NO se ha convertido en pulpo, se suma 1 a la posición `01` de la tabla.
- Si NO se encuentra el evento indicado entre los eventos del REGISTRO y Mariano SI se ha convertido en pulpo, se suma 1 a la posición `10` de la tabla.
- Si se encuentra el evento indicado entre los eventos del REGISTRO y Mariano SI se ha convertido en pulpo, se suma 1 a la posición `11` de la tabla.

`mostrarTabla()`

Muestra `matrizEventos`, es decir, la matriz con los valores de la tabla, de la forma: 

```
La tabla para pizza es [1, 1, 1, 0]
```

#### CASOS TEST

Para los siguientes registros:
```
["trabajar", "abrazar un árbol", "pizza", "correr", "television"], false
["trabajar", "helado", "coliflor", "lasaña", "abrazar un árbol", "lavarse los dientes"], false
["pescar", "bicicleta", "descansar", "mejillones", "cerveza"], true
```

las salidas en consola son:
```
“La tabla para pizza es [1, 1, 1, 0]”
“La tabla para abrazar un árbol es [0, 2, 1, 0]”
“La tabla para pescar es [2, 0, 0, 1]”
“La tabla para mejillones es [2, 0, 1, 0]”
```

## VI- Clase PHIS

Para calcular las correlaciones de todos los eventos y almacenarlos en una estructura de datos, vamos a crear un `diccionario` que contenga como `clave` el nombre del evento y como `valor` su coeficiente de correlación phi.

Crea una clase llamada `Phis`.

PROPIEDADES

`mapaCoeficientes`

Diccionario que contiene como clave el nombre del evento y como valor su coeficiente de correlación phi.

METODOS

`calcularCorrelaciones(diario)`

Método que recibe el `diario` y actualiza el diccionario `mapaCoeficientes` con cada evento y su correlación.

La lógica de esta función es la siguiente:

Para encontrar todos los tipos de eventos presentes en el `diario` iteramos sobre sus `registros` y hacemos un _loop_ sobre los `eventos` de cada `registro`.

Si encontramos un evento que no está presente en el diccionario `mapaCoeficientes`, calculamos su correlación y lo añadimos al diccionario.

Para calcular su correlación, primero has de calcular la tabla para ese evento con la función `tablaPara(evento, diario)` y luego calcular la correlación phi con la función `phi(tabla)`.


`mostrarPhis()` 

Muestra por consola el nombre de cada evento del diccionario y su correlación del modo 
```
La correlación para 'pizza' es 0.069
```

#### CASOS TEST

Crea un objeto (diccionario) de la clase `Phis` y calcula las correlaciones para todos los eventos del diario que ya has creado anteriormente:

```
["trabajar", "abrazar un árbol", "pizza", "correr", "television"], false
["trabajar", "helado", "coliflor", "lasaña", "abrazar un árbol", "lavarse los dientes"], false
["pescar", "bicicleta", "descansar", "mejillones", "cerveza"], true
```

Recorre el diccionario `Phis` y muestra las correlaciones de cada evento de la forma:

```
La correlación para pizza es -0.5
La correlación para abrazar un árbol es -1
La correlación para pescar es 1
La correlación para mejillones es 1
```

## VII - Casos test de la clase Phis

Se provee un fichero de texto con varios registros y el resultado sobre el cuerpo de Mariano.

Utilízalos del modo que estimes oportuno para obtener los siguientes casos test del diccionario `Phis`

```
weekend:        0.1371988681
brushed teeth: -0.3805211953
candy:          0.1296407447
work:          -0.1371988681
spaghetti:      0.2425356250
reading:        0.1106828054
peanuts:        0.5902679812
```


## VIII - Dibuja el diagrama de clases UML de esta aplicación. 

Es suficiente con que lo hagas a mano y me lo entregues en papel.
