<template>
  <input
    v-model.lazy="percent"
    v-money="percentOptions"
    v-on="listeners"
    :maxlength="maxLength"
    v-bind="$props" />
</template>

<script>
import { VMoney } from 'v-money';

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
    suffix: Boolean,
  },
  data() {
    return {
      percent: formatPercent(this.value, this.integerPlaces, this.decimalPlaces),
      percentOptions: {
        ...this.$attrs,
        decimal: ',',
        precision: this.decimalPlaces,
        suffix: this.suffix ? ' %' : undefined,
        masked: false, /* doesn't work with directive */
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
      this.$emit('input', unformat(value, this.percentOptions));
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
      const extraChars = this.suffix ? extraChar + 2 : extraChar;
      this.maxLength = this.integerPlaces + this.decimalPlaces + extraChars;
    },
    onInputBlur() {
      this.$nextTick(() => {
        this.$emit('blur', unformat(this.percent, this.percentOptions));
      });
    },
  },
};

function unformat(value, options) {
  const { suffix, precision } = options;
  const negative = value < 0 ? -1 : 1;
  const percent = suffix ? value.replace(' %', '') : value;

  return percentToFloat(percent, precision) * negative;
}

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

</script>
