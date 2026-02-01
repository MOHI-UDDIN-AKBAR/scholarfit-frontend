import type { KeyMetricCard, MeasurementSet } from '../../types/progress';
import { KEY_METRIC_CONFIG } from '../constants/appConstants';
import {
  formatDeltaFromStart,
  formatValueWithUnit,
  getChangeColorByDelta,
} from '../helpers/formatUtils';
import type { WeightTrend } from '../types';

export const mapKeyMetricsCards = (
  weightTrend: WeightTrend,
  latestMeasurements: MeasurementSet
): KeyMetricCard[] => {
  const cards: KeyMetricCard[] = [];

  cards.push({
    id: 'weight',
    title: KEY_METRIC_CONFIG.weight.title,
    value: formatValueWithUnit(weightTrend.current, weightTrend.unit),
    icon: KEY_METRIC_CONFIG.weight.icon,
    iconColor: KEY_METRIC_CONFIG.weight.iconColor,
    iconBg: KEY_METRIC_CONFIG.weight.iconBg,
    change: weightTrend.change,
    changeText: formatDeltaFromStart(weightTrend.change, weightTrend.unit),
    changeColor: getChangeColorByDelta(weightTrend.change),
  });

  const bodyFat = latestMeasurements.bodyFat;
  if (bodyFat) {
    cards.push({
      id: 'body-fat',
      title: KEY_METRIC_CONFIG.bodyFat.title,
      value: formatValueWithUnit(bodyFat.value, bodyFat.unit),
      icon: KEY_METRIC_CONFIG.bodyFat.icon,
      iconColor: KEY_METRIC_CONFIG.bodyFat.iconColor,
      iconBg: KEY_METRIC_CONFIG.bodyFat.iconBg,
    });
  }

  return cards;
};
