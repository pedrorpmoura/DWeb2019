<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <html>
                <head>
                    <title>Arqueossítios</title>
                    <meta charset="UTF8"/>
                </head>
                
                <style>
                    html {
                        background-color: gainsboro;
                        font-family: Helvetica;
                    }
                    
                    body {
                        width: 60%;
                        margin-left: auto;
                        margin-right: auto;
                        background-color: ghostwhite;
                        padding-bottom: 5px;
                        font-size: 20px;
                    }
                    
                    h1 {
                        font-size: 40px;
                        padding: 20px;
                        text-align: center;
                        padding-bottom: 0px;
                    }
                    
                    h3, ul {
                        padding-left: 40px;
                        padding-right: 40px;
                    }
                </style>
                
                <body>
                    <h1>ARQUEOSSÍTIOS</h1>
                    <hr/>
                    <h3>ÍNDICE</h3>
                    <ul>
                        <xsl:apply-templates mode="index"/>
                    </ul>
                </body>
            </html>
            
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="index">
        <li>
            <a id="{count(preceding-sibling::*)+1}" href="/{count(preceding-sibling::*)+1}"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>