from rest_framework import serializers
from weeklyorder.models import WeeklyOrderItem, WeeklyOrder


class WeeklyOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyOrderItem
        fields = [
            'id',
            'weeklyorder_id', 'dish_id',
        ]


class WeeklyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyOrder
        fields = [
            'id', 'weeklymenu_id',
            'customer_id', 'week_start_date',
            'skipped', 'delivered', 'charged'
        ]
