<template>
    <button
        type="button"
        class="menu-button"
        :class="{ 'is-active': isActive }"
        @click="toggle"
    >
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </button>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
            };
        },

        methods: {
            toggle() {
                this.isActive = !this.isActive;
            },
        },
    };
</script>

<style scoped>
    .menu-button {
        padding: 7px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .menu-button div {
        display: block;
        position: relative;
        width: 26px;
        height: 3px;
        margin: 9px 0;
    }

    .menu-button span {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: all 0.3s, 0.3s;
        background-color: #222;
    }

    .menu-button span:nth-child(1) {
        transform: translateY(-8px);
    }

    .menu-button span:nth-child(3) {
        transform: translateY(8px);
    }

    .menu-button.is-active span:nth-child(1) {
        transform: rotate(45deg);
    }

    .menu-button.is-active span:nth-child(2) {
        background-color: transparent !important;
    }

    .menu-button.is-active span:nth-child(3) {
        transform: rotate(-45deg);
    }
</style>
