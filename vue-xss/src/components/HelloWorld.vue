<template>
    <div class="greetings">

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
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}
h3 {
    font-size: 1.2rem;
}
.remarks {
    width: 100%;
}
.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
