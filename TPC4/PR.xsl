<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8" />
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF8"/>
            </head>
            
            <style>
                html {
                    font-family: Helvetica
                }
            </style>
            
            <body>
                <h1 align="center">Project Record</h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
        
    </xsl:template>
    
    
    <xsl:template match="metadata">
        <ul>
            <li><b>KEYNAME: </b><xsl:value-of select="keyname"/></li>
            <li><b>TITLE: </b><xsl:value-of select="title"/></li>
            <li><b>SUPERVISOR: </b> <a href="{supervisor/@homepage}"><xsl:value-of select="supervisor"/></a></li>
            <li><b>BEGIN DATE: </b><xsl:value-of select="bdate"/></li>
            <li><b>END DATE: </b><xsl:value-of select="edate"/></li>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="workteam">
        <h3>WorkTeam:</h3>
        <ol>
            <xsl:apply-templates mode="wlist"/>
        </ol>
        <hr/>
        
    </xsl:template>
    
    <xsl:template match="worker" mode="wlist">
        <li><xsl:value-of select="name"/> (<xsl:value-of select="identifier"/>) - 
            <xsl:value-of select="email"/> - 
            <a href="{git}">GitHub</a></li>
    </xsl:template>
    
    <xsl:template match="abstract">
        <h3>Abstract: </h3>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}"><xsl:apply-templates/></a>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <h3>Deliverables</h3>
        <ul>
            <xsl:apply-templates mode="dlist"/>
        </ul>
    </xsl:template>
    
    <xsl:template match="deliverable" mode="dlist">
        <li>
            <a href="{@path}" target="_blank"><xsl:value-of select="current()"/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>