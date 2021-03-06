﻿<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    
    version="1.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQELEM">
        <html>
            <head>
                <title><xsl:value-of select="IDENTI"/></title>
                <meta charset="UTF8"/>
            </head>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            
            <style>
                body {
                    padding: 20px;
                }
            </style>
            <body>
                <table class="w3-table w3-striped w3-bordered">
                    <xsl:apply-templates mode="contents-table"/>
                </table>
                <hr/>
                <address>
                    <a href="/">Voltar à Página Inicial</a>
                </address>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="TIPO" mode="contents-table">
        <tr>
            <td><b>TIPO</b></td>
            <td><xsl:value-of select="@ASSUNTO"/></td>
        </tr>
    </xsl:template>

    <xsl:template match="IDENTI" mode="contents-table">
        <tr>
            <td><b>IDENTI</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="IMAGEM" mode="contents-table">
        <tr>
            <td><b>IMAGEM</b></td>
            <td><img src="{@NOME}"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="DESCRI" mode="contents-table">
        <tr>
            <td><b>DESCRI</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <a href="{@TERMO}"><xsl:value-of select="current()"/></a>
    </xsl:template>
    
    <xsl:template match="CRONO" mode="contents-table">
        <tr>
            <td><b>CRONO</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="LUGAR" mode="contents-table">
        <tr>
            <td><b>LUGAR</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="FREGUE" mode="contents-table">
        <tr>
            <td><b>FREGUE</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="CONCEL" mode="contents-table">
        <tr>
            <td><b>CONCEL</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="CODADM" mode="contents-table">
        <tr>
            <td><b>CODADM</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="LATITU" mode="contents-table">
        <tr>
            <td><b>LATITU</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="LONGIT" mode="contents-table">
        <tr>
            <td><b>LONGIT</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="ALTITU" mode="contents-table">
        <tr>
            <td><b>ALTITU</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>

    <xsl:template match="ACESSO" mode="contents-table">
        <tr>
            <td><b>ACESSO</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="QUADRO" mode="contents-table">
        <tr>
            <td><b>QUADRO</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="TRAARQ" mode="contents-table">
        <tr>
            <td><b>TRAARQ</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="DESARQ" mode="contents-table">
        <tr>
            <td><b>DESARQ</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="INTERP" mode="contents-table">
        <tr>
            <td><b>INTERP</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="DEPOSI" mode="contents-table">
        <tr>
            <td><b>DEPOSI</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="INTERE" mode="contents-table">
        <tr>
            <td><b>INTERE</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="BIBLIO" mode="contents-table">
        <tr>
            <td><b>BIBLIO</b></td>
            <td><xsl:apply-templates/></td>
        </tr>
    </xsl:template>

    <xsl:template match="AUTOR" mode="contents-table">
        <tr>
            <td><b>AUTOR</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>

    <xsl:template match="DATA" mode="contents-table">
        <tr>
            <td><b>DATA</b></td>
            <td><xsl:value-of select="current()"/></td>
        </tr>
    </xsl:template>
    
</xsl:stylesheet>