export default {
    save: function save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    load: function load(key){
        return JSON.parse(localStorage.getItem(key))
    }
}