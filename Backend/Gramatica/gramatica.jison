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
    const { Casteo } = require("../dist/src/Expresiones/Casteo");
    const { Incremento_Decremento } = require("../dist/src/Instrucciones/Incremento_Decremento");
    const { Vector1 } = require("../dist/src/Instrucciones/Vector1");
    const { CWhile } = require("../dist/src/Instrucciones/Ciclos/While");
    const { Break } = require("../dist/src/Instrucciones/Break");
    const { Ternario } = require("../dist/src/Expresiones/Ternario");
    const { AccesoVector } = require("../dist/src/Expresiones/AccesoVector");
    const { ModificarVector } = require("../dist/src/Instrucciones/ModificarVector");
    const { Vector2 } = require("../dist/src/Instrucciones/Vector2");
    const { Continue } = require("../dist/src/Instrucciones/Continue");
    const { Return } = require("../dist/src/Instrucciones/Return");
    const { Case } = require("../dist/src/Instrucciones/Control/Case");
    const { Default } = require("../dist/src/Instrucciones/Control/Default");
    const { Switch } = require("../dist/src/Instrucciones/Control/Switch");
    const { For } = require("../dist/src/Instrucciones/Ciclos/For");
    const { DoUntil } = require("../dist/src/Instrucciones/Ciclos/DoUntil");
    const { Loop } = require("../dist/src/Instrucciones/Ciclos/Loop");
    const { Funcion } = require("../dist/src/Instrucciones/Funcion");
    const { Llamada } = require("../dist/src/Instrucciones/Llamada");
    const { Ejecutar } = require("../dist/src/Instrucciones/Ejecutar");
    const { LowerUpper } = require("../dist/src/Expresiones/FuncionesDelLenguaje/LowerUpper");
    const { Round } = require("../dist/src/Expresiones/FuncionesDelLenguaje/Round");
    const { Len } = require("../dist/src/Expresiones/FuncionesDelLenguaje/Len");
    const { Truncate } = require("../dist/src/Expresiones/FuncionesDelLenguaje/Truncate");
    const { Is } = require("../dist/src/Expresiones/FuncionesDelLenguaje/Is");
    const { ToString } = require("../dist/src/Expresiones/FuncionesDelLenguaje/ToString");
    const { ToCharArray } = require("../dist/src/Expresiones/FuncionesDelLenguaje/ToCharArray");
    const { Error_ } = require("../dist/src/Error/Errores_.js");
    const { TipoError } = require("../dist/src/Error/Errores_.js");
    const { agregarError } = require("../dist/src/AST/AST");
    

    let errores = [];

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

// Sentencia Switch
"Switch"               return 'SWITCH';
"case"                 return 'CASE';
"default"              return 'DEFAULT';

// while
"while"                return 'WHILE';

// break
"break"                return 'BREAK';

// continue
"continue"             return 'CONTINUE';

// return
"return"               return 'RETURN';

// For
"for"                  return 'FOR';

// Do until
"do"                   return 'DO';
"until"                return 'UNTIL';

// Loop
"loop"                 return 'LOOP';

// Void
"void"                 return 'VOID';

// Function
"function"             return 'FUNCTION';

// Let  
"let"                  return 'LET';

// const
"const"                return 'CONST';

// new - vector
"new"                  return 'NEW';
"vector"               return 'VECTOR';

// casteo
"cast"                 return 'CAST';
"as"                   return 'AS';

// Lower 
"lower"               return 'LOWER';

// Upper
"upper"               return 'UPPER';

// Round
"round"               return 'ROUND';

// Len
"len"                 return 'LEN';

// Truncate
"truncate"            return 'TRUNCATE';

// Is
"is"                  return 'IS';

// ToString
"toString"            return 'TOSTRING';

// toCharArray
"toCharArray"         return 'TOCHARARRAY';

// Ejecutar
"ejecutar"            return 'EJECUTAR';

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

// agregando secuencias de escape
\"([^\"\\]|\\[btnr\"\'\\])*\" {
    var texto = yytext.substr(1, yyleng - 2);
    texto = texto.replace(/\\n/g, "\n");
    texto = texto.replace(/\\\\/g, "\\");
    texto = texto.replace(/\\"/g, "\"");
    texto = texto.replace(/\\t/g, "\t");
    texto = texto.replace(/\\r/g, "\r");
    texto = texto.replace(/\\'/g, "'");
    texto = texto.replace(/\\b/g, "\b");
    yytext = texto;
    return 'STRING';
}

\'([^\'\\]|\\[btnr\"\'\\])\' {
    var texto = yytext.substr(1, yyleng - 2);
    texto = texto.replace(/\\n/g, "\n");
    texto = texto.replace(/\\\\/g, "\\");
    texto = texto.replace(/\\'/g, "'");
    texto = texto.replace(/\\t/g, "\t");
    texto = texto.replace(/\\r/g, "\r");
    texto = texto.replace(/\\b/g, "\b");
    yytext = texto;
    return 'CHAR';
}

"true"                              return 'TRUE';
"false"                             return 'FALSE';
"int"|"double"|"bool"|"char"|"string"|NULL  {return 'TIPO';}

([a-zA-Z_][a-zA-Z0-9_]*)\b             return 'ID';



<<EOF>>                 return 'EOF';

. { errores.push(new Error_(yytext, yylloc.first_line + 1, yylloc.first_column + 1, TipoError.LEXICO));
    return;}

// Finaliza parte de Léxica
/lex

// precedencia
%left 'DOSPUNTOS'
%left 'AND'
%left 'OR'
%right 'NOT'
%left 'IGUALDAD','DISTINTO', 'MENOR', 'MENORIGUAL', 'MAYOR', 'MAYORIGUAL'
%left 'MAS','RESTA'
%left 'PRODUCTO','DIV', 'MODULO'
%nonassoc 'POTENCIA','RAIZ'
%nonassoc 'IS'
%right 'UNARIO'



// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

// La expresión return solamente indica que el análisis terminará allí
ini : instrucciones  EOF { return  new AST($1,errores);}
;
instrucciones : instrucciones instruccion          {  $1.push($2); $$ = $1;}
              | instruccion                        { $$ = [$1];}
;
instruccion
            : funciones                         {$$ = $1;}
            | Variables PYC                     {$$ = $1;}
            | incremento_y_decremento PYC       {$$ = $1;}
            | vectores PYC                      {$$ = $1;}
            | inst_break PYC                    {$$ = $1;}
            | inst_continue PYC                 {$$ = $1;}
            | inst_return PYC                   {$$ = $1;}
            | subrutinas                        {$$ = $1;}
            | ejecutar                          {$$ = $1;}
            | error PYC        {errores.push(new Error_(yytext, @1.first_line, @1.first_column, TipoError.SINTACTICO));}
;

// ================ Ejecutar ===================

ejecutar
    : EJECUTAR llamada1 PYC                { $$ = new Ejecutar($2, @1.first_line, @1.first_column); }
;

// ================ Variables ===================

Variables 
    : declaracion                       { $$ = $1; }
    | asignacion_var                    { $$ = $1; }
;

declaracion
    : LET lista_var DOSPUNTOS TIPO var_exp     { $$ = new Declaracion($4,$2,$5,false,@1.first_line,@1.first_column);}
    | CONST lista_var DOSPUNTOS TIPO var_exp     { $$ = new Declaracion($4,$2,$5,true,@1.first_line,@1.first_column);}
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

// Retorno de valores con $$ 
// Unario 
expresion 
         : RESTA expresion %prec UNARIO         {$$ = new Aritmetica(new Basico("0",TipoDato.ENTERO,0,0),$2,OpAritmetico.NEGACION,0,0);} 
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
         | casteos                              { $$ = $1;}
         | ternario                             { $$ = $1;}
         | acceso_vector                        { $$ = $1;}
         | llamada1                             { $$ = $1;}
         | funcionesNativas                     { $$ = $1;}
         
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

// ================ ternario ===================

ternario
    : IF PIZQ expresion PDER expresion DOSPUNTOS expresion    { $$ = new Ternario($3,$5,$7,@1.first_line,@1.first_column);}
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




// ================ Casteos ===================

casteos
    : CAST PIZQ expresion AS TIPO PDER     { $$ = new Casteo($5,$3,@1.first_line,@1.first_column);}
;

// ================ Incremento y Decremento ===================

incremento_y_decremento
    : ID INCREMENTO                        { $$ = new Incremento_Decremento($1,$2,@1.first_line,@1.first_column);}
    | ID DECREMENTO                        { $$ = new Incremento_Decremento($1,$2,@1.first_line,@1.first_column);}
;

// ================ Vectores ===================

vectores 
    : declaracion_vectores            { $$ = $1;}
    | modificar_vector                { $$ = $1;}
;
 
declaracion_vectores 
    // Declaración de tipo 1
    : LET lista_var DOSPUNTOS TIPO CIZQ CDER IGUAL NEW VECTOR TIPO CIZQ expresion CDER                                  { $$ = new Vector1($2,$4,$10,$12,null,@1.first_line,@1.first_column);}   
    | LET lista_var DOSPUNTOS TIPO CIZQ CDER CIZQ CDER IGUAL NEW VECTOR TIPO CIZQ expresion CDER CIZQ expresion CDER    { $$ = new Vector1($2,$4,$12,$14,$17,@1.first_line,@1.first_column);}
    // Declaración de tipo 2
    | LET lista_var DOSPUNTOS TIPO CIZQ CDER IGUAL asignacion_vector                                            { $$ = new Vector2($2,$4,$8,@1.first_line,@1.first_column,true);}
    | LET lista_var DOSPUNTOS TIPO CIZQ CDER CIZQ CDER IGUAL CIZQ lista_de_lista_valores CDER                         { $$ = new Vector2($2,$4,$11,@1.first_line,@1.first_column,false);}
;

asignacion_vector
    : tochararray                   { $$ = $1; }
    | CIZQ lista_valores CDER       { $$ = $2; }
;

lista_de_lista_valores
    : lista_de_lista_valores COMA CIZQ lista_valores CDER     { $$ = $1; $$.push($4);}
    | CIZQ lista_valores CDER                                           { $$ = [$2];}
;

lista_valores
    : lista_valores COMA expresion     { $$ = $1; $$.push($3);}
    | expresion                        { $$ = [$1];}
;

acceso_vector
    : ID CIZQ expresion CDER                     { $$ = new AccesoVector($1,$3,null,@1.first_line,@1.first_column);}
    | ID CIZQ expresion CDER CIZQ expresion CDER { $$ = new AccesoVector($1,$3,$6,@1.first_line,@1.first_column);}
;

modificar_vector
    : ID CIZQ expresion CDER IGUAL expresion     { $$ = new ModificarVector($1,$3,null,$6,@1.first_line,@1.first_column);}
    | ID CIZQ expresion CDER CIZQ expresion CDER IGUAL expresion { $$ = new ModificarVector($1,$3,$6,$9,@1.first_line,@1.first_column);}
;

// ================ Funciones ===================

funciones 
    : fn_echo PYC                         {$$ = $1;}
    | fn_if                               {$$ = $1;}
    | Switch                              {$$ = $1;}
    | ciclo_while                         {$$ = $1;}
    | ciclo_for                           {$$ = $1;}
    | ciclo_do_until                      {$$ = $1;}
    | ciclo_loop                          {$$ = $1;}
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
    | LLIZQ LLDER                                  { $$ = new Bloque([],@1.first_line,@1.first_column); }
;   

// ================ Sentencia Switch ===================

Switch
    : SWITCH PIZQ expresion PDER LLIZQ case default LLDER { $$ = new Switch($3,$6,$7,@1.first_line,@1.first_column); }
;

case
    : lista_casos      { $$ = $1; }
    |                  { $$ = null; }
;

lista_casos
    : lista_casos casos                    { $1.push($2); $$ = $1;}
    | casos                               { $$ = [$1];}
;

casos 
    : CASE expresion DOSPUNTOS instrucciones         { $$ = new Case($2,$4,@1.first_line,@1.first_column); }
;

default
    : DEFAULT DOSPUNTOS instrucciones                     { $$ = new Default($3,@1.first_line,@1.first_column); }
    |                                                     { $$ = null; }                                                    
;

// ================ Ciclo While ===================

ciclo_while
        : WHILE PIZQ expresion PDER bloque    {$$ = new CWhile($3,$5, @1.first_line, @1.first_column)} 
;

inst_break
        : BREAK                                {$$ = new Break(@1.first_line,@1.first_column)}
;

inst_continue
        : CONTINUE                             {$$ = new Continue(@1.first_line,@1.first_column)}
;

inst_return
        : RETURN expresion                     {$$ = new Return(@1.first_line,@1.first_column,$2)}
        | RETURN                               {$$ = new Return(@1.first_line,@1.first_column,null)}
;

// ================ Ciclo for ===================

ciclo_for 
    : FOR PIZQ Variables PYC expresion PYC actualizacion_variables PDER bloque      { $$ = new For($3,$5,$7,$9,@1.first_line,@1.first_column); }
;

actualizacion_variables
    : incremento_y_decremento         { $$ = $1; }
    | asignacion_var                  { $$ = $1; }  
;

// ================ Ciclo Do Until ===================

ciclo_do_until
    : DO bloque UNTIL PIZQ expresion PDER PYC     { $$ = new DoUntil($2,$5,@1.first_line,@1.first_column); }
;

// ================ Ciclo Loop ===================

ciclo_loop
    : LOOP bloque    { $$ = new Loop($2,@1.first_line,@1.first_column); }
;

// ================ Funciones y Metodos ===================


subrutinas 
    : declaracion_funciones                             { $$ = $1; }
    | Metodos                               { $$ = $1; }
    | llamada1 PYC                          { $$ = $1; }
;

declaracion_funciones
    : FUNCTION TIPO ID PIZQ casos_parametros PDER bloque      { $$ = new Funcion($2,$3,$5,$7,@1.first_line,@1.first_column); }
;

Metodos
    : FUNCTION VOID ID PIZQ casos_parametros PDER bloque      { $$ = new Funcion($2,$3,$5,$7,@1.first_line,@1.first_column); }
;

llamada1
    : ID PIZQ casos_parametros2 PDER     { $$ = new Llamada($1,$3,true,@1.first_line,@1.first_column); }
;

llamada2
    : ID PIZQ casos_parametros2 PDER     { $$ = new Llamada($1,$3,false,@1.first_line,@1.first_column); }
;

lista_valores_funcions
    :                    { $$ = []; }
    | lista_valores      { $$ = $1; }
;

casos_parametros
    :                    { $$ = []; }
    | parametros         { $$ = $1; }                   
;



parametros
    : parametros COMA parametro                { $1.push($3); $$ = $1; }               
    | parametro                                { $$ = [$1]; }
;

parametro
    : ID DOSPUNTOS TIPO IGUAL expresion         { $$ = {id:$1, tipo:$3, exp:$5, vector: false, simple: false } }
    | ID DOSPUNTOS TIPO                         { $$ = {id:$1, tipo:$3, exp:null, vector: false, simple: false} }
    | ID DOSPUNTOS TIPO CIZQ CDER               { $$ = {id:$1, tipo:$3, exp:null, vector: true, simple: true} }
    | ID DOSPUNTOS TIPO CIZQ CDER CIZQ CDER     { $$ = {id:$1, tipo:$3, exp:null, vector: true, simple: false} }
;

casos_parametros2
    :                    { $$ = []; }
    | parametros_2       { $$ = $1; }                   
;

parametros_2
    : parametros_2 COMA parametro_2                  { $1.push($3); $$ = $1; }
    | parametro_2                                   { $$ = [$1]; }
;

parametro_2
    : ID IGUAL expresion                        { $$ = {id:$1, exp:$3} }
;


// ================ Lower ===================

funcionesNativas
    : lower                            { $$ = $1; }
    | upper                            { $$ = $1; }
    | round                            { $$ = $1; }
    | len                              { $$ = $1; }
    | truncate                         { $$ = $1; }
    | ls                               { $$ = $1; }
    | tostring                         { $$ = $1; }
;

lower
    : LOWER PIZQ expresion PDER     { $$ = new LowerUpper($3,true,@1.first_line,@1.first_column); }
;

upper
    : UPPER PIZQ expresion PDER     { $$ = new LowerUpper($3,false,@1.first_line,@1.first_column); }
;

round
    : ROUND PIZQ expresion PDER     { $$ = new Round($3,@1.first_line,@1.first_column); }
;

len
    : LEN PIZQ expresion PDER     { $$ = new Len($3,@1.first_line,@1.first_column); }
;

truncate 
    : TRUNCATE PIZQ expresion PDER     { $$ = new Truncate($3,@1.first_line,@1.first_column); }
;

ls 
    : expresion IS TIPO                { $$ = new Is($1,$3,@1.first_line,@1.first_column); }
;

tostring
    : TOSTRING PIZQ expresion PDER     { $$ = new ToString($3,@1.first_line,@1.first_column); }
;

tochararray
    : TOCHARARRAY PIZQ expresion PDER     { $$ = new ToCharArray($3,@1.first_line,@1.first_column); }
;