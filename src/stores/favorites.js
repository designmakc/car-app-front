import { defineStore } from 'pinia'

// Store для обраного (Favorites)
// state:
//   count: number — кількість обраних
// actions:
//   add() — додати до обраного
//   remove() — видалити з обраного
//   set(val) — встановити конкретне значення

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    count: parseInt(localStorage.getItem('favoritesCount')) || 0,
    items: JSON.parse(localStorage.getItem('favoriteItems')) || []
  }),
  actions: {
    add(item) {
      if (!this.items.some(i => i.id === item.id)) {
        this.items.push(item)
        this.count = this.items.length
        this.saveToLocalStorage()
      }
    },
    remove(itemId) {
      this.items = this.items.filter(i => i.id !== itemId)
      this.count = this.items.length
      this.saveToLocalStorage()
    },
    set(items) {
      this.items = items
      this.count = items.length
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('favoritesCount', this.count.toString())
      localStorage.setItem('favoriteItems', JSON.stringify(this.items))
    }
  }
}) 