package com.soaplasticos;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.dsl.xml.io.XmlRoutesBuilderLoader;
import org.apache.camel.spi.Resource;
import org.apache.camel.support.ResourceHelper;

/**
 * Carga routes.xml desde el sistema de archivos o classpath.
 */
public class XmlRoutesLoader extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        // Camel 4 XML DSL: carga el archivo de rutas externo
        Resource resource = ResourceHelper.fromString("routes.xml",
            getClass().getClassLoader()
                .getResourceAsStream("routes.xml") != null
                ? new String(getClass().getClassLoader()
                    .getResourceAsStream("routes.xml").readAllBytes())
                : java.nio.file.Files.readString(java.nio.file.Path.of("routes.xml")));

        getContext().loadRoutes(resource);
    }
}
