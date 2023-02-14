<template>
    <div class="greetings">
        <p class="disclaimer"><i>NB: pensez à lancer le serveur de l'exercice 2-vanilla-xss en même temps que celui-ci</i></p>
        <!-- Une image masquée<img src="" onerror="alert('Ceci peut être dangereux')" /> -->
        <p>N'hésitez pas à nous envoyer vos suggestions d'amélioration</p>
        <textarea v-model="text" rows="5" cols="120"></textarea>
        <button @click="onButtonClick">Envoyer</button>

        <table class="remarks">
            <tr v-for="rem of remarks" :key="rem.date">
                <td v-html="rem.shortDate"></td>
                <td v-html="rem.message"></td>
                <td><a :href="rem.message">click me</a></td>
            </tr>
        </table>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from "axios"
export default defineComponent({
    setup() {
        let text = ref("")
        let remarks = ref([])
        function onButtonClick() {
            axios.get(`/api/remarks?text=${this.text}`).then(response => {
                const elem = response.data[0]
                elem.shortDate = elem.date.split(" ")[1]
                this.remarks.push(elem)
            })
        }
        return { text, remarks, onButtonClick }
    }
})
</script>

<style scoped>
.remarks {
    width: 100%;
    margin-top: 50px;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}
.disclaimer {
    position: fixed;
    top: 30px;
    margin: auto;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
