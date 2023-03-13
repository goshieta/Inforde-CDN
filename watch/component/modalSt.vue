<template>
    <div class="modal_win">
        <h2 v-if="watchInitial.mode=='add'">ストップウォッチ(秒時計)の追加</h2>
        <h2 v-if="watchInitial.mode=='edit'">ストップウォッチ(秒時計)の編集</h2>
        <form>
            <label class="txt_form">ストップウォッチの名前を入力<input type="text" v-model="stWatchTitle"></label>
        </form>
        <div class="modal_button_area">
            <button @click="$emit('shutComp')" class="flat_button2">キャンセル</button>
            <button class="flat_button" @click="addStopWatch" v-if="watchInitial.mode=='add'">追加</button>
            <button class="flat_button" @click="editStopWatch" v-if="watchInitial.mode=='edit'">変更</button>
        </div>
    </div>
</template>
<script>
    export default{
        props:[
            "watchInitial"
        ],
        data(){
            return {
                stWatchTitle:this.watchInitial.title
            }
        },
        methods:{
            addStopWatch(){
                this.$emit('shutComp')
                this.$emit('newSt',{
                    stName:this.stWatchTitle
                })
            },
            editStopWatch(){
                this.$emit("shutComp")
            }
        }
    }
</script>