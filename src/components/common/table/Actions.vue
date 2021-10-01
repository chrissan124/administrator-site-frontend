<template>
  <div v-if="!disabled">
    <a-space size="middle" :class="miniClass.default">
      <a-button
        :key="index"
        v-for="(button, index) in buttons"
        style="width: 7em"
        :icon="button.icon"
        @click="clicked(button.event)"
        :disabled="disabled"
        >{{ button.text }}</a-button
      >
    </a-space>
    <a-popover v-if="!onlyIcons" :class="miniClass.mini">
      <template slot="content">
        <a-space size="middle" align="center">
          <a-icon
            :key="index"
            v-for="(button, index) in buttons"
            class="icon"
            style="font-size: 1.2em"
            :type="button.icon"
            @click="clicked(button.event)"
            :disabled="disabled"
          />
        </a-space>
      </template>
      <a-icon :rotate="90" style="font-size: 1.5em" type="more" />
    </a-popover>
    <a-space v-else-if="onlyIcons" size="large">
      <a-icon
        :key="index"
        v-for="(button, index) in buttons"
        class="icon"
        style="font-size: 1.2em"
        :type="button.icon"
        @click="clicked(button.event)"
        :disabled="disabled"
      />
    </a-space>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
export interface Buttons {
  details: boolean | Function
  update: boolean | Function
  delete: boolean | Function
  restore: boolean | Function
}
export interface ButtonProps {
  text: string
  icon: string
  event: string
}
const buttons: Array<ButtonProps> = [
  {
    text: 'Details',
    icon: 'info-circle',
    event: 'details',
  },
  {
    text: 'Edit',
    icon: 'edit',
    event: 'update',
  },
  {
    text: 'Delete',
    icon: 'delete',
    event: 'delete',
  },
]

const defaults = {
  details: true,
  update: true,
  delete: true,
  restore: true,
}

const checkButton = (btnName: string, buttons: Object): boolean => {
  for (let [key, value] of Object.entries(buttons)) {
    if (key === btnName && value) {
      return true
    }
  }
  return false
}

@Component({})
export default class TableLayout extends Vue {
  @Prop({ default: null })
  selected!: null | String

  @Prop({ default: null })
  current!: null | String

  @Prop({
    default: () => ({}),
  })
  defaultButtons!: Buttons

  @Prop({
    default: () => {
      return []
    },
  })
  extraButtons!: Array<ButtonProps>

  @Prop({ default: false })
  mini!: boolean

  @Prop({ default: false })
  onlyIcons!: boolean

  get disabled() {
    return !this.current || this.current !== this.selected
  }

  get defaults() {
    return { ...defaults, ...this.defaultButtons }
  }

  get miniClass() {
    return {
      default: this.mini ? 'default-mini' : 'default',
      mini: this.mini || this.onlyIcons ? 'responsive-mini' : 'responsive',
    }
  }

  buttons = buttons
    .filter((btn) => {
      return checkButton(btn.event, this.defaults)
    })
    .concat(this.extraButtons)

  clicked(event: string) {
    this.$emit(event)
  }
}
</script>

<style lang="scss" scoped>
.responsive {
  display: none;
}
.default-mini {
  display: none;
}

.responsive-mini {
  display: block;
}

@media only screen and (max-width: 1300px) {
  .default {
    display: none;
  }

  .responsive {
    display: block;
  }
  .icon {
    @include icon-hover;
  }
}
</style>