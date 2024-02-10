import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'
import { useModalStore } from './modal'

export const useBebidasStore = defineStore('bebidas', () => {

  const modal = useModalStore()
  const categorias = ref([])
  const busqueda = reactive({
    nombre: '',
    categoria: ''
  })

  const recetas = ref([])
  const receta = ref({})

  onMounted(async () => {
    const {data: {drinks}} = await APIService.obtenerCategorias()
    categorias.value = drinks
  })

  async function obtenerRecetas() {
    const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
    // console.log(drinks)
    recetas.value = drinks
  }

  async function seleccionarBebida(id){
    // console.log(id);
    const {data: {drinks}} =await APIService.buscarReceta(id)
    // console.log(drinks[0])
    receta.value = drinks[0]
    modal.handleClickModal()
  }

  return {
    categorias,
    busqueda,
    recetas,
    receta,
    obtenerRecetas,
    seleccionarBebida,
  }
})