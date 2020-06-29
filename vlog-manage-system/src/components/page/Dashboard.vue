<template>
    <div class="main-pages">
        星星牌VLOG信息管理系统
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {

        }
    },
    components: {
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
    }
};
</script>


<style scoped>
.main-pages{
    background: #ffff;
    height: calc(100vh - 150px);
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 300px;
}
</style>
