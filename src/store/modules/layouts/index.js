const state = {
  menuCollapse: localStorage.getItem('menuCollapse') === 'true' || false
}

const mutations = {
  SET_MENU_COLLAPSE: (state, collapse) => {
    state.menuCollapse = collapse
    localStorage.setItem('menuCollapse', collapse)
  }
}

const actions = {
  setMenuCollapse ({ commit }, collapse) {
    commit('SET_MENU_COLLAPSE', collapse)
  }
}

const getters = {
  getMenuCollapse: state => state.menuCollapse
}

export default {
  state,
  mutations,
  actions,
  getters
}
