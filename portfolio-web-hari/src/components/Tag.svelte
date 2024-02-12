<script lang="ts">
    // make it so that I export a name and I have a const dictionary where each name is linked to an icon. The names are Coder, Designer and Musician.
    export let name: string;
    // assign a type of string to string to the below dictionary
    export const icons: { [key: string]: string } = {
        Coder: "👨‍💻",
        Designer: "🎨",
        Musician: "🎵"
    };
</script>

<style>

</style>

<button>
    <p>{name}</p>
    <p>{icons[name]}</p>
</button>