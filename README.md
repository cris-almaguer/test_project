
# Sistema de administración de inventario - Prueba Técnica

Este es un proyecto de aplicación web que utiliza Spring Boot y Spring Security para el backend y React con Vite y Redux para el frontend. Así como otras librerias como shadcn/ui para los componentes visuales en la aplicación y Tailwind CSS para los estilos.

Es importante mencionar que se hace uso de la autenticación de usuarios mediante JSON Web Tokens para otorgar un sistema robusto y seguro. 

En el siguiente link, se puede visualizar un video demo de la aplicación en ejecución.

**https://youtu.be/iRO2PtgqEeI**


## Comenzando

Estas instrucciones te proporcionarán información general importante para que el proyecto funcione de la mejor manera posible.   
### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Java (JDK v21 o superior)
- Maven (v3.9.6 o superior)
- Node.js (v20 o superior)
- MySQL (v8)
    
> [!WARNING]
> Es importante cumplir con los prerrequisitos para asegurar que el proyecto funcione sin inconvenientes.
### Instalación de dependencias y arranque de proyectos (Backend y Frontend)

Sigue estos pasos para instalar y configurar tu entorno de desarrollo local:

**Clonación del repositorio**

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

**Instalación de dependencias y arranque del proyecto backend (Spring Boot)**

Para este paso es vital configurar una conexión con la base de datos, esto dependerá de credenciales y puerto configurados en su ordenador.

En un explorador de archivos vaya a la siguiente ruta y abra el siguiente archivo con el editor de texto de su preferencia:

```
inventory/src/main/resources/application.properties
```

Una vez dentro es deber de usted identificar y reemplazar lo necesario con las credenciales de su conexión a MySQL, con la base de datos creada, sin tablas.

```
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/training_test_db
spring.datasource.username=root
spring.datasource.password=
```

> [!NOTE]
> La estructura de la base de datos será creada por Spring con ayuda correspondiente de su ORM.

Vaya al directorio del proyecto:

```bash
cd inventory
```

Instalación de dependencias con Maven:

```bash
./mvnw install
```

Construye y ejecuta el servidor backend usando Maven:

```bash
./mvnw spring-boot:run
```

La primera vez que el proyecto se ejecute, se creará la estructura de tablas en la base de datos indicada, ademas con ayuda del archivo **_AppDataSeeder.java_** se insertarán registros de los roles usados en el sistema y dos usuarios para probar dicho sistema con las siguientes credenciales:

_Usuario Administrador_
```
admin@test.com
test@2024
```

_Usuario Almacenista_
```
almacenista@test.com
test@2024
```

**Instalación de dependencias y arranque del proyecto frontend (React TS)**

Vaya al directorio del proyecto:

```bash
cd inventory-front
```

Instalación de dependencias con npm:

```bash
npm install
```

Arrancar el servidor

```bash
npm run dev
```
> [!IMPORTANT]
> Es importante mencionar que es necesario asegurarse de que el proyecto de frontend en Vite se ejecute con la URL **http://localhost:5173/** esto para evitar inconvenientes con el CORS desde el proyecto de backend en Spring Boot.

¡Listo! Ahora puedes abrir tu navegador en http://localhost:5173/ para ver la aplicación en funcionamiento.
