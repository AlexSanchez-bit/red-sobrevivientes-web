<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Primer segmento visible -->
    <section class="mb-4">
      <h1 class="text-2xl text-center font-semibold text-primary" id="about_us">
        Sobre Nosotros
      </h1>
      <p class="text-gray-700 mt-2">
        <strong class="text-primary">¿Quiénes somos?</strong><br />
        Red de Sobrevivientes de Abuso Sexual Clerical (RESABSEC) somos una
        organización sin ánimo de lucro que brinda un acompañamiento de carácter
        jurídico a los Sobrevivientes de Abuso Sexual Clerical en Colombia,
        consolidamos testimonios para posteriormente convertirlos en denuncias
        ante las autoridades penales o civiles. Actualmente contamos con
        colaboradores y con voluntarios, sobrevivientes/no sobrevivientes de
        Abuso Sexual Clerical, MAYORES DE EDAD que tengan conocimientos en el
        área del derecho, psicología, ciencias comunicativas y administración
        pública; fortaleciendo sus liderazgos a través de constantes procesos de
        capacitación que les doten de herramientas para abordar las
        problemáticas de la Violencia Clerical en Colombia desde la empatía y la
        sanación.
      </p>
    </section>

    <!-- Segundo segmento visible -->
    <section class="mb-4">
      <h2 class="text-lg font-semibold text-primary">Misión</h2>
      <p class="text-gray-700 mt-2">
        Nuestra misión es acompañar, empoderar y defender a las víctimas de
        abuso sexual infantil cometido por religiosos, brindándoles apoyo
        jurídico especializado y promoviendo la justicia, la reparación y la
        prevención de futuros casos. Trabajamos para romper el silencio,
        garantizar los derechos de las víctimas y contribuir a la construcción
        de una sociedad más justa y segura.
      </p>
    </section>

    <!-- Contenido colapsable -->
    <transition name="fade" mode="out-in">
      <div v-if="expanded" class="space-y-6">
        <section>
          <div class="space-y-4 text-gray-700">
            <p>
              <strong class="text-primary">Visión</strong><br />En cinco años,
              La Red de Sobrevivientes de Abuso Sexual Clerical, estará como una
              organización líder en la defensa jurídica de las víctimas de abuso
              sexual infantil por parte de religiosos, reconocida por nuestro
              impacto en la obtención de justicia y reparación para las
              víctimas. Habremos contribuido a la implementación de políticas
              públicas efectivas para prevenir estos delitos, fortalecido las
              redes de apoyo para las víctimas y generado un cambio cultural que
              priorice la protección de los derechos de la infancia y la
              rendición de cuentas de las instituciones religiosas.
            </p>

            <p>
              <strong class="text-primary"
                >Antecedentes de la Política de protección Infantil</strong
              ><br />La política de Protección Infantil de la Red de
              Sobrevivientes de Abuso Sexual Clerical fue construida porque al
              ser defensores de derechos humanos en Colombia, creemos en la
              capacidad de incidencia que tenemos incluso en nuestra propia
              organización para reducir y mitigar cualquier tipo de violencia
              infantil. Esta política fue construida a partir de los
              conocimientos adquiridos en la capacitación para la construcción
              de políticas de protección y prevención de Keeping Children Safe
              además de nuestra participación en la 1ra Conferencia Ministerial
              para Poner Fin a la Violencia Contra la niñez, donde recogimos
              insumos académicos de suma importancia para desarrollar
              estrategias que nos permitan hacer de esta política una
              herramienta efectiva que guíe a nuestros aliados y colaboradores
              hacia la erradicación de la violencia contra la niñez. En la
              creación de está política evaluamos todos los posibles riesgos a
              los que se enfrentan los niños, niñas, adolescentes y adultos
              vulnerables que se encuentran en la planta física de nuestra
              organización, reconociendo a los mismos como sujetos de derecho y
              estableciendo un marco legal tanto nacional
              <strong class="font-extrabold text-black text-[1.02rem]"
                >(Ley 1098 de 2006 Código Colombiano de infancia y
                adolescencia)</strong
              >
              como internacional que reduzca cualquier posibilidad de
              vulneración de sus derechos.
            </p>

            <p>
              <strong class="text-primary">Principios</strong><br />Esta
              política de protección infantil organizacional se basa en los
              estándares de Keeping Children Safe; la Convención de los Derechos
              del Niño de la Organización de Naciones Unidas (ONU) de 1989, la
              Declaración de la Eliminación del Abuso Sexual y la Explotación
              por parte del personal de la ONU; la legislación nacional de
              protección infantil de Colombia
              <strong class="font-extrabold text-black text-[1.02rem]"
                >(Ley 1098 de 2006 Código Colombiano de infancia y
                adolescencia)</strong
              >
              , Insumos recogidos en la 1ra Conferencia Ministerial para Poner
              Fin a la Violencia Contra la niñez y en buenas prácticas
              internacionales.
            </p>

            <p>
              La Constitución Política de Colombia de 1991 parte de un principio
              fundamental que es la
              <strong class="font-extrabold text-black text-[1.03rem]">
                dignidad humana
              </strong>
              , reconociendo a los individuos como sujetos de derecho, en el
              caso de la niñez la defensa de está dignidad humana es imperativa
              en todos los sentidos para la Red de Sobrevivientes de Abuso
              Sexual Clerical; ya que reiteramos nuestro compromiso con
              erradicar las violencias no sólo en entornos clericales sino en
              nuestra propia organización e instalaciones.
            </p>

            <ul class="list-decimal list-inside space-y-1">
              <li>
                Defensa de la dignidad humana de los niños, niñas y adolescentes
                como pilar fundamental de la política.
              </li>
              <li>
                Reconocimiento de los niños, niñas y adolescentes como sujetos
                de derecho para garantizar la no vulneración de los mismos.
              </li>
              <li>
                Capacitación constante a todos los colaboradores de la Red de
                Sobrevivientes de Abuso Sexual para garantizar un ambiente
                seguro para la infancia en la planta física de la organización.
              </li>
              <li>
                Todas las acciones de la Red de Sobrevivientes de Abuso Sexual
                Clerical estarán orientadas a la erradicación y mitigación de
                cualquier tipo de violencia.
              </li>
              <li>
                Priorizar la comodidad, tranquilidad e integridad de los niños,
                niñas y adolescentes que asistan a nuestras instalaciones.
              </li>
            </ul>

            <p><strong class="text-primary">Términos y definiciones</strong></p>
            <p>
              <strong class="text-primary"
                >¿Qué es una Política de Protección Infantil
                Organizacional?</strong
              ><br />
              La protección infantil organizacional es la responsabilidad que
              las organizaciones tienen de asegurarse que su personal,
              operaciones y programas no “no dañen” a los niños, niñas y
              adolescentes. Es decir, que no los expongan a posibles maltratos y
              abusos, y que toda preocupación que surja sobre la seguridad de
              niños, niñas y adolescentes en la comunidad en la que se trabaja,
              sea debidamente reportada o denunciada a las autoridades
              correspondientes. El principio de “no daño” se refiere a la
              responsabilidad de las organizaciones de “no dañar” o de minimizar
              el daño que inadvertidamente podemos producir como resultado de
              una mala ejecución de programas o por el simple hecho de estar
              presentes en la comunidad (Keeping Children Safe). La definiciones
              y términos que reposan en este documento son una construcción de
              lo consolidado en la legislación colombiana
              <strong class="font-extrabold text-black text-[1.02rem]"
                >(Ley 1098 de 2006 Código Colombiano de infancia y
                adolescencia)</strong
              >
            </p>

            <p>
              <strong class="text-primary">Niño, niña y Adolescente.</strong
              ><br />
              En Colombia la clasificación del rango etario para la definición
              de niño, niña y adolescente establece que: Niño y niña: Individuos
              menores de 12 años. Esta categoría incluye a todos los menores de
              esa edad, sin distinción. Adolescente: Individuo que tiene entre
              12 y 18 años.
            </p>

            <p>
              <strong class="text-primary">Maltrato Infantil.</strong><br />
              Cualquier acción u omisión que cause daño físico, psicológico o
              emocional a un niño o niña; incluyendo el
              <span class="text-primary">abuso físico</span>, el
              <span class="text-primary">abuso sexual</span>, la
              <span class="text-primary">negligencia</span>, el maltrato
              emocional y cualquier forma de violencia que afecte el bienestar y
              desarrollo integral de un menor.
            </p>

            <p>
              <strong class="text-primary">Maltrato Físico.</strong><br />
              Cualquier acción que cause daño físico a un niño o niña. Esto
              incluye golpes, empujones, quemaduras, o cualquier forma de
              agresión que resulte en lesiones o dolor físico.
            </p>

            <p>
              <strong class="text-primary">Castigo Físico.</strong><br />
              Cualquier forma de sanción que implique el uso de la fuerza física
              con el fin de corregir o disciplinar a un niño o niña. Esto
              incluye <span class="underline">golpear</span>,
              <span class="underline">azotar</span> o cualquier acción que cause
              dolor físico como método de disciplina.
            </p>

            <p>
              <strong class="text-primary">Abuso Sexual.</strong><br />
              Cualquier acto de índole sexual realizado con un niño, niña o
              adolescente que no tenga la capacidad de dar su consentimiento, o
              que se realice mediante coerción, manipulación o engaño.
              Incluyendo <span class="underline">tocamientos</span>,
              <span class="underline">relaciones sexuales</span>,
              <span class="underline">explotación sexual</span> y cualquier
              forma de abuso que involucre la utilización de la sexualidad de un
              menor.
            </p>

            <p>
              <strong class="text-primary">Explotación Sexual. </strong><br />
              Cualquier forma de abuso que utilice a un niño, niña o adolescente
              en actividades sexuales con fines económicos donde exista un
              intercambio de dinero, bienes o beneficios, o que se realice con
              fines de <span class="underline">prostitución</span>,
              <span class="underline">pornografía</span> o cualquier otra forma
              de <span class="underline">explotación sexual</span>, incluyendo
              la <span class="underline">trata de personas</span>.
            </p>

            <p>
              <strong class="text-primary">Negligencia.</strong><br />
              Falta de atención, cuidado o protección que un niño, niña o
              adolescente necesita para su desarrollo integral, situaciones
              donde hay una omisión de responsabilidad de proporcionar a un
              menor lo necesario para su bienestar físico, emocional y
              educativo. Incluyendo ausencia de alimentación adecuada, atención
              médica, educación, o un ambiente seguro y saludable.
            </p>

            <p>
              <strong class="text-primary">Bullying.</strong><br />
              Cualquier forma de violencia física, verbal o psicológica que se
              presenta de manera sistemática, donde uno o varios niños, niñas o
              adolescentes ejercen poder sobre otro, generando un ambiente
              hostil y perjudicial para la víctima.
            </p>
            <p>
              <strong class="text-primary">Explotación Comercial.</strong><br />
              Utilización de niños, niñas o adolescentes en actividades
              económicas que comprometen su desarrollo integral y bienestar,
              incluyendo situaciones en las que los menores son forzados o
              inducidos a trabajar en condiciones que pueden ser perjudiciales
              para su salud, educación o desarrollo emocional.
            </p>
            <p>
              <strong class="text-primary">Maltrato Espiritual.</strong><br />
              Cualquier acción u omisión que cause daño emocional o psicológico
              a un niño, niña o adolescente, afectando su desarrollo integral y
              su bienestar, incluyendo el uso de creencias, prácticas o
              doctrinas que menoscaben la dignidad del menor, así como la
              imposición de ideas que generen miedo, angustia o confusión.
            </p>
            <p>
              <strong class="text-primary"
                >Maltrato virtual y Material de Abuso Sexual Infantil.</strong
              ><br />
              cualquier forma de agresión que se realiza a través de medios
              digitales, como el ciberacoso, la difusión de contenido sexual
              explícito sin consentimiento, o cualquier otra conducta que
              menoscabe la dignidad y los derechos de los niños y adolescentes
              en el entorno virtual.
            </p>

            <p>
              <strong class="text-primary">Abuso de Poder.</strong><br />
              Acción de un individuo que, por su posición de autoridad o
              superioridad, utiliza su poder de manera indebida para
              <span class="underline">explotar</span>,
              <span class="underline">coaccionar</span> o
              <span class="underline">maltratar</span> a otra persona,
              especialmente a un niño, niña o adolescente. Este abuso puede
              manifestarse de diversas formas, incluyendo
              <span class="underline">violencia física</span> ,
              <span class="underline">psicológica</span>,
              <span class="underline">sexual</span> o
              <span class="underline">económica</span>.
            </p>

            <p>
              <strong class="text-primary"
                >Maltrato por actos de “posesión”, “brujería” o relacionado a
                creencias espirituales o religiosas.</strong
              ><br />
              acción que cause daño o sufrimiento a un menor, ya sea físico,
              emocional o psicológico, y que derive de creencias o prácticas que
              no respeten los derechos fundamentales de los niños y niñas. Esto
              incluye situaciones en las que se les haga sentir que están
              poseídos o en las que se les someta a rituales que pueden
              causarles miedo, angustia o cualquier tipo de daño.
            </p>

            <p>
              <strong class="text-primary">Maltrato por Revictimización.</strong
              ><br />
              situaciones en las que un niño, niña o adolescente que ha sido
              víctima de violencia o abuso es sometido nuevamente a experiencias
              traumáticas debido a la manera en que se maneja su caso, ya sea
              por parte de autoridades, instituciones o el entorno en general,
              incluyendo la falta de atención adecuada, el proceso de
              judicialización que causa más daño o la exposición a situaciones
              que reviven el trauma original.
            </p>

            <p>
              <strong class="text-primary">Desprotección Infantil. </strong
              ><br />
              situación en la que un niño, niña o adolescente se encuentra en
              riesgo o vulnerabilidad debido a diversas circunstancias que
              afectan su bienestar y desarrollo integral. Esto puede incluir
              factores como la violencia, el abuso, la negligencia, la
              explotación, la falta de atención adecuada, o la ausencia de un
              ambiente familiar adecuado.
            </p>
          </div>
        </section>
      </div>
    </transition>

    <!-- Botón Mostrar más / menos -->
    <div class="mt-6 text-center hidden">
      <button
        @click="expanded = !expanded"
        class="bg-primary text-white px-6 py-2 rounded-full transition-all duration-300 hover:bg-primary/70 border-0"
      >
        {{ expanded ? "Mostrar menos" : "Mostrar más" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const expanded = ref(true);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
