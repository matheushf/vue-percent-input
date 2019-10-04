<template>
  <input
    v-model.lazy="percent"
    v-money="percentOptions"
    :maxlength="maxLength"
    v-on="listeners"
    v-bind="$props" />
</template>

<script>
import { VMoney } from 'v-money';

function percentToFloat(percent, decimalPlaces) {
  if (typeof percent !== 'string') return percent;

  const float = parseFloat(percent.replace(',', '.'));
  const parsed = parseFloat(float.toFixed(decimalPlaces));

  return parsed > 0 ? parsed : 0;
}

function getZeroPad(percentString, integerPlaces, decimalPlaces) {
  const percentSplit = percentString.split('.');
  const hasDecimal = percentSplit.length === 2;
  const currentIntegerPlaces = percentSplit[0].length;
  const currentDecimalPlaces = hasDecimal ? percentSplit[1].length : 0;
  const currentPlacesSum = currentIntegerPlaces + currentDecimalPlaces;

  return hasDecimal
    ? (decimalPlaces - currentDecimalPlaces) + (currentPlacesSum + 1)
    : decimalPlaces + currentIntegerPlaces;
}

function formatPercent(percent, integerPlaces, decimalPlaces) {
  if (!percent) return 0;

  const percentString = percent.toString();
  const zeroPad = getZeroPad(percentString, integerPlaces, decimalPlaces);

  return percentString.padEnd(zeroPad, '0');
}

export default {
  name: 'PercentInput',
  directives: { money: VMoney },
  props: {
    integerPlaces: {
      type: Number,
      default: 3,
    },
    decimalPlaces: {
      type: Number,
      default: 2,
    },
    value: [Number, String],
  },
  data() {
    return {
      percent: formatPercent(this.value, this.integerPlaces, this.decimalPlaces),
      percentOptions: {
        decimal: ',',
        precision: this.decimalPlaces,
        masked: false,
      },
      maxLength: this.calcMaxLength(this.value),
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        blur: this.onInputBlur,
        input: () => {},
      };
    },
  },
  watch: {
    percent(value) {
      this.calcMaxLength(value);
      this.$emit('input', percentToFloat(value, this.decimalPlaces));
    },
  },
  methods: {
    calcMaxLength(value) {
      if (parseFloat(value) === 0) {
        this.setMaxLength(2);
      } else {
        this.setMaxLength(1);
      }
    },
    setMaxLength(extraChar) {
      this.maxLength = this.integerPlaces + this.decimalPlaces + extraChar;
    },
    onInputBlur() {
      this.$nextTick(() => {
        this.$emit('blur', percentToFloat(this.percent, this.decimalPlaces));
      });
    },
  },
};
</script>
