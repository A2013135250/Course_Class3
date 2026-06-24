package com.soaplasticos;

import org.apache.camel.main.Main;

/**
 * Punto de entrada del ESB.
 * Camel Main carga automáticamente routes.xml desde el classpath.
 */
public class EsbMain {
    public static void main(String[] args) throws Exception {
        Main main = new Main();
        // Camel 4 detecta routes.xml en src/main/resources o raíz del jar
        main.configure().addRoutesBuilder(new XmlRoutesLoader());
        main.run(args);
    }
}
