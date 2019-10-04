# VuePercentInput

Lightweight Percent Input for Vue. Use it as a normal input, add your classes and attributes

![percent-input](https://user-images.githubusercontent.com/16087712/66238833-c6888d00-e6ce-11e9-823b-2213bdd5fa67.gif)


(based on [v-money](https://github.com/vuejs-tips/v-money))

## Usage

### Globally

```js
import Vue from 'vue'
import PercentInput from 'vue-percent-input'

// register component <percent-input>
Vue.use(PercentInput)
```

### Or as component:

```html
<template>
  <div>
    <percent-input v-model="percent"></percent-input>
      {{percent}}
  </div>
</template>

<script>
  import { PercentInput } from 'percent-input'

  export default {
    components: { PercentInput },
    data () {
      return {
        percent: 99.99,
      }
    }
  }
</script>
```


## Props

| property  | Required | Type    | Default | Description                                             |
|-----------|----------|---------|---------|---------------------------------------------------------|
| integer-places | false | Number  | 3       | How many integer places                                 |
| decimal-places   | false    | Number  | 2     | How many decimal places                                        |
| suffix    | false    | Boolean  | false      | Percentage suffix: " %"                            |

Suports all VMoney props
