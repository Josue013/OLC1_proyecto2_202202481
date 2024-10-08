%{
  //Se accede a dist porque allí se encuentra el compilado
    const { Basico } = require("../dist/src/Expresiones/Basico");
    const { TipoDato } = require("../dist/src/Expresiones/Tipos");
    const { AST } = require("../dist/src/AST/AST");
    const { Aritmetica,OpAritmetico } = require("../dist/src/Expresiones/Aritmetica");
    const { Relacional,OperadorRelacional } = require("../dist/src/Expresiones/Relacional");
    const { Logico ,OperadorLogico } = require("../dist/src/Expresiones/Logicos");
    const { Acceso  } = require("../dist/src/Expresiones/Acceso");
    const { Echo } = require("../dist/src/Instrucciones/Echo");
    const { Declaracion } = require("../dist/src/Instrucciones/Declaracion");
    const { Asignacion } = require("../dist/src/Instrucciones/Asignacion");
    const { Fn_if } = require("../dist/src/Instrucciones/Control/If");
    const { Bloque } = require("../dist/src/Instrucciones/Bloque");

%}


%lex // Inicia parte léxica

%options case-insensitive

%%

// Expresiones regulares

\s+                                   /* IGNORAR ESPACIOS */

"//".*                                /* IGNORAR COMENTARIOS DE LINEA*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORAR COMENTARIOS DE BLOQUE */

// Palabras reservadas


"null"                  return 'NULL';

// Funcion echo
"echo"                 return 'ECHO';

// Funcion if
"if"                   return 'IF';
"else"                 return 'ELSE';

// Let  
"let"                  return 'LET';

// Aritmeticos
"++"                    return 'INCREMENTO';
"--"                    return 'DECREMENTO';
"+"                     return 'MAS';
"-"                     return 'RESTA';
"*"                     return 'PRODUCTO';
"/"                     return 'DIV';
"^"                      return 'POTENCIA';
"$"                     return 'RAIZ';
"%"                     return 'MODULO';


// Relacional
"=="                     return 'IGUALDAD';
"!="                     return 'DISTINTO';
"<="                     return 'MENORIGUAL';
">="                     return 'MAYORIGUAL';
"<"                      return 'MENOR';
">"                      return 'MAYOR';


// Logicos
"&&"                    return 'AND';
"||"                    return 'OR';
"!"                     return 'NOT';

//Agrupaciones
"("                     return 'PIZQ';
")"                     return 'PDER';

// Finalizacion y encapsulamiento
"{"                     return 'LLIZQ';
"}"                     return 'LLDER';
";"                     return 'PYC';

// Otros
","                     return 'COMA';
"."                     return 'PUNTO';
":"                     return 'DOSPUNTOS';
"["                     return 'CIZQ';
"]"                     return 'CDER';
"="                     return 'IGUAL';


// tipos de datos
[0-9]+("."[0-9]+)\b                 return 'DOUBLE';
[0-9]+\b                            return 'NUMBER';
\"[^\"]*\"				            { yytext = yytext.substr(1,yyleng-2); return 'STRING'; }
\'([^\']|[\t]|[\n]|[\r]|[ ])\'      {yytext = yytext.substr(1,yyleng-2);return 'CHAR';}
"true"                              return 'TRUE';
"false"                             return 'FALSE';
"int"|"double"|"bool"|"char"|"string"|NULL  {return 'TIPO';}

([a-zA-Z])[a-zA-Z0-9_]*             return 'ID';



<<EOF>>                 return 'EOF';

.					   {
    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);
                        }

// Finaliza parte de Léxica
/lex

// precedencia
%left 'AND'
%left 'OR'
%right 'NOT'
%left 'IGUALDAD','DISTINTO', 'MENOR', 'MENORIGUAL', 'MAYOR', 'MAYORIGUAL'
%left 'MAS','RESTA'
%left 'PRODUCTO','DIV', 'MODULO'
%nonassoc 'POTENCIA','RAIZ'
%right 'UNARIO'


// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

// La expresión return solamente indica que el análisis terminará allí
ini : instrucciones  EOF { return  new AST($1) }
;
instrucciones : instrucciones instruccion          {  $1.push($2); $$ = $1;}
              | instruccion                        { $$ = [$1];}
;
instruccion
            : funciones                         {$$ = $1;}
            | Variables PYC                   {$$ = $1;}
;


// Retorno de valores con $$ 
// Unario 
expresion 
         : RESTA expresion %prec UNARIO         {$$ = new Aritmetica(new Basico("0",TipoDato.ENTERO,0,0),$2,OpAritmetico.RESTA,0,0);} 
         | expresion MAS expresion              {$$ = new Aritmetica($1,$3,OpAritmetico.SUMA,0,0);}
         | expresion RESTA expresion            {$$ = new Aritmetica($1,$3,OpAritmetico.RESTA,0,0);}
         | expresion PRODUCTO expresion         {$$ = new Aritmetica($1,$3,OpAritmetico.PRODUCTO,0,0);}
         | expresion DIV expresion              {$$ = new Aritmetica($1,$3,OpAritmetico.DIVISION,0,0);}
         | expresion POTENCIA expresion         {$$ = new Aritmetica($1,$3,OpAritmetico.POTENCIA,0,0);}
         | expresion RAIZ expresion             {$$ = new Aritmetica($1,$3,OpAritmetico.RAIZ,0,0);}
         | expresion MODULO expresion           {$$ = new Aritmetica($1,$3,OpAritmetico.MODULO,0,0);}
         | relacional                           { $$ = $1 }
         | logicos                              { $$ = $1 }
         | tipo_datos                           { $$ = $1;} 
         | ID                                   { $$ = new Acceso($1,@1.first_line,@1.first_column)} 
         | PIZQ expresion PDER                  { $$ = $2}
;

relacional : expresion IGUALDAD expresion       { $$ = new Relacional($1,$3,OperadorRelacional.IGUALDAD,0,0);}
           | expresion DISTINTO expresion       { $$ = new Relacional($1,$3,OperadorRelacional.DISTINTO,0,0);}
           | expresion MENOR expresion          { $$ = new Relacional($1,$3,OperadorRelacional.MENOR,0,0);}
           | expresion MENORIGUAL expresion     { $$ = new Relacional($1,$3,OperadorRelacional.MENORIGUAL,0,0);}
           | expresion MAYOR expresion          { $$ = new Relacional($1,$3,OperadorRelacional.MAYOR,0,0);}
           | expresion MAYORIGUAL expresion     { $$ = new Relacional($1,$3,OperadorRelacional.MAYORIGUAL,0,0);}
;

logicos
        : expresion AND expresion               { $$= new Logico($1,$3,OperadorLogico.AND,@1.first_line,@1.first_column);}
        | expresion OR expresion                { $$= new Logico($1,$3,OperadorLogico.OR,@1.first_line,@1.first_column);}
        | NOT expresion                        { $$= new Logico($2,null,OperadorLogico.NOT,@1.first_line,@1.first_column);}
;

// ================ Instrucciones ================


// ================ Tipo de datos ================
tipo_datos 
    : NUMBER                          { $$ = new Basico($1,TipoDato.ENTERO,0,0);}
    | DOUBLE                          { $$ = new Basico($1,TipoDato.DECIMAL,0,0);}
    | STRING                          { $$ = new Basico($1,TipoDato.STRING,0,0);}
    | CHAR                            { $$ = new Basico($1,TipoDato.CHAR,0,0);}
    | TRUE                            { $$ = new Basico($1,TipoDato.BOOLEANO,0,0); }
    | FALSE                           { $$ = new Basico($1,TipoDato.BOOLEANO,0,0); }
    | NULL                            { $$ = new Basico($1,TipoDato.NULL,0,0); }
    
;

// ================ Variables ===================

Variables 
    : declaracion                       { $$ = $1; }
    | asignacion_var                    { $$ = $1; }
;

declaracion
    : LET lista_var DOSPUNTOS TIPO var_exp     { $$ = new Declaracion($4,$2,$5,@1.first_line,@1.first_column);}
;

var_exp 
    :                                                      { $$ = null; }
    | IGUAL expresion                                     { $$ = $2; }
    ;

lista_var
    : lista_var COMA ID              { $$ = $1; $$.push($3);}
    | ID                             { $$ = [$1];}
;

asignacion_var
    : ID IGUAL expresion            {$$ = new Asignacion($1,$3,@1.first_line,@1.first_column);}               
;

// ================ Funciones ===================

funciones 
    : fn_echo PYC                         {$$ = $1;}
    | fn_if PYC                           {$$ = $1;}
;

// ================ Funcion echo ===================

fn_echo
    : ECHO expresion                 { $$ = new Echo($2,@1.first_line,@1.first_column);}
;

// ================ Sentencia IF ===================

fn_if
    : IF PIZQ expresion PDER bloque                 { $$ = new Fn_if($3,$5,null,null); }
    | IF PIZQ expresion PDER bloque ELSE bloque     { $$ = new Fn_if($3,$5,$7,null); }
    | IF PIZQ expresion PDER bloque ELSE fn_if      { $$ = new Fn_if($3,$5,null,$7); }
;

bloque
    : LLIZQ instrucciones LLDER                     { $$ = new Bloque($2,@1.first_line,@1.first_column); }
;   


