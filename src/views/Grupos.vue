<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApp } from '../stores/app'
const app = useApp(), router = useRouter()
const nome = ref(''), tipo = ref('casa'), outros = ref('')
const tipos = { casa: 'Casa', republica: 'República', viagem: 'Viagem' }
function criar() {
  const nomes = [app.usuario.nome, ...outros.value.split(',').map((n) => n.trim()).filter(Boolean)]
  router.push(`/grupo/${app.criarGrupo(nome.value, tipo.value, nomes)}`)
}
</script>
<template>
  <div class="row g-4">
    <div class="col-md-6">
      <h2 class="h4">Seus grupos</h2>
      <p v-if="!app.grupos.length">Você ainda não tem grupos. Crie o primeiro ao lado.</p>
      <RouterLink v-for="g in app.grupos" :key="g.id" :to="`/grupo/${g.id}`" class="cartao d-block mb-2 text-decoration-none text-reset">
        <strong>{{ g.nome }}</strong>
        <div class="small text-muted">{{ tipos[g.tipo] }} - {{ g.membros.length }} pessoas</div>
      </RouterLink>
    </div>
    <div class="col-md-6">
      <form class="cartao" @submit.prevent="criar">
        <h2 class="h5">Novo grupo</h2>
        <label class="form-label" for="n">Nome do grupo</label>
        <input id="n" v-model="nome" class="form-control mb-2" placeholder="Ex.: República Centro" required />
        <label class="form-label" for="t">Tipo</label>
        <select id="t" v-model="tipo" class="form-select mb-2">
          <option v-for="(l, k) in tipos" :key="k" :value="k">{{ l }}</option>
        </select>
        <label class="form-label" for="o">Outras pessoas (separe por vírgula)</label>
        <input id="o" v-model="outros" class="form-control mb-3" placeholder="Ana, João, Bia" required />
        <button class="btn btn-dindin">Criar grupo</button>
      </form>
      <div class="cartao mt-3" style="background:var(--menta)">
        <h2 class="h6"><i class="bi bi-stars"></i> Em breve: viagens, festas e controle por mês</h2>
        <p class="small mb-2">Quer usar o Dindin nessas situações? Entre na lista e avisamos você.</p>
        <RouterLink to="/interesse" class="btn btn-sm btn-dindin">Quero ser avisado</RouterLink>
      </div>
    </div>
  </div>
</template>
