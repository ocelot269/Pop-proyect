# El pulpo de raza loba

## Índice
1. [Desarrollo en Entorno Cliente](#cliente)
2. [Despliegue de la Aplicación Web](#despliegue)
3. [Diseño de Interfaces](#interfaces)
    - [Diseño de la interfaz](#diseñoInt)
    - [Css GRID y Css Flexbox](#css)
    - [Tipografía utilizada](#tipografia)
    - [Paleta de colores](#colores)
4. [Información](#información)


## 1. Desarrollo en Entorno Cliente<a id="cliente"></a>
Texto del primer apartado


## 2. Despliegue de la Aplicación Web<a id="despliegue"></a>
La documentación se podrá encontrar aqui:

https://docs.google.com/document/d/1zNieCK8W2y5TGMrqelVzl2OGJVB7lNgssOU4jdh1PEQ/edit?usp=sharing


## 3. Diseño de Interfaces<a id="interfaces"></a>
### 3.1. Diseño de la interfaz<a id="diseñoInt"></a>

#### 3.1.1. Explicación del diseño de las diferentes interfaces (Escritorio, móvil, tablet...)
----

#### 3.1.2. Cambios que ocurren cuando el usuario cambia de una interfaz a otra
----

#### 3.1.3. Puntos de interrupción
---

### 3.2. Css GRID y Css Flexbox<a id="css"></a>

Se ha creado una base fija con ***Grid***, ya que hemos considerado que es más sencillo y más practico a la hora de hacerlo responsive. Nuestra base fija consta de 3 partes, el *navbar* que se encuentra en la parte superior y ocupa todo. Luego encontramos la parte central, la cual dependiendo de la página en la que te encuentres, hay más partes o menos. En el index, por ejemplo, hay dos partes, la del contenido y la del sidebar, que tiene como contenido el Newsletter. En cambio, la del diario solo tiene el contenido, que ocupa toda la parte central.

Finalmente encontramos el *footer*, el cual para situar cada parte ha sido utilizado ***flexbox***, por el hecho de que fuese más sencillo definir y colocar cada columna donde queriamos. 

También se ha hecho uso tanto de ***Grid*** como de ***Flexbox***, en la parte del diario. Ya que la fila donde se encuentran los nombres de los días esta creada con ***Grid***. Las filas, donde podemos ver los números, está creada con una estructura de ***Grid*** y dentro utilizamos ***Flexbox*** para poder situar cada día en su respectiva posición. Se ha creado la estructura con ***Grid*** porque al hacerlo en formato móvil o tablet, es más sencillo que con ***Flexbox***.

En la gráfica se utiliza ***Flexbox***.

### 3.3. Tipografía utilizada<a id="tipografia"></a>

Se han utilizado dos tipografías cogidas desde [Google Fonts](https://fonts.google.com/). 

Para el cuerpo utilizamos [Noto Sans](https://fonts.google.com/specimen/Noto+Sans). Queríamos utilizar una tipografía que fuese fácil de leer y que no quedase muy cargada la página. Decidimos decantarnos por esta porque vimos que era bastante normal, pero a la vez es divertida y fuera de lo habitual.

Después para los títulos utilizamos [Fjalla One](https://fonts.google.com/specimen/Fjalla+One). Vimos que encajaba bastante bien con la que habíamos decidido para el cuerpo y que era diferente a las demás. También consideramos que resaltaba muy bien en titulo. 

### 3.4. Paleta de colores<a id="colores"></a>


## 4. Información<a id="información"></a>
***Nombres de los autores:*** Jose Antonio Zamora Andrés y Sandra Cabrera García

***Curso:*** 2º Desarrollo de Aplicaciones Web

***Duración del proyecto:*** Desde --/--/2019 hasta 10/12/2019

***Proyecto:*** El pulpo de raza loba

***Descripción breve del proyecto:*** Construir una aplicación web para poder ver y registrar los eventos que le suceden cada día a Mariano, con la finalidad de averiguar cuales de ellos provocan que se transforme en pulpo.

