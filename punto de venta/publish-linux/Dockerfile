# Tu proyecto usa .NET 10 (PuntoDeVenta.runtimeconfig.json -> tfm: net10.0)
# Publicación SELF-CONTAINED: el ejecutable trae su propio runtime (.so incluidos),
# por lo que se usa la imagen base mínima (runtime-deps) y se ejecuta el apphost.

FROM mcr.microsoft.com/dotnet/runtime-deps:10.0

WORKDIR /app

# Copia todo el contenido publicado (wwwroot, appsettings.json, DLLs, etc.)
COPY . .

# Se asegura de que el ejecutable nativo tenga permiso de ejecucion
RUN chmod +x /app/PuntoDeVenta

# Blazor se sirve por HTTP dentro del contenedor en el puerto 80
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Ejecuta el apphost nativo (self-contained) de tu app
ENTRYPOINT ["./PuntoDeVenta"]