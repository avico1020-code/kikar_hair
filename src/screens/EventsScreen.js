import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { events } from '../data/mockData';

export default function EventsScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      return event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate();
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const hasEvents = getEventsForDate(date).length > 0;
      const isSelected = date.toDateString() === selectedDate.toDateString();

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[styles.calendarDayText, hasEvents && styles.calendarDayTextBold]}>
            {day}
          </Text>
          {hasEvents && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const upcomingEvents = events.filter(event => event.date > new Date()).sort((a, b) => a.date - b.date);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Ionicons name="chevron-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarWeekDays}>
          {dayNames.map((day, index) => (
            <Text key={index} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {renderCalendar()}
        </View>
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.eventsContainer}>
        {eventsForSelectedDate.length > 0 ? (
          eventsForSelectedDate.map((event) => (
            <EventCard key={event.id} event={event} navigation={navigation} />
          ))
        ) : (
          <>
            <Text style={styles.upcomingTitle}>אירועים קרובים</Text>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} navigation={navigation} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function EventCard({ event, navigation }) {
  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetail', { event })}
    >
      <View style={styles.eventImageContainer}>
        <Text style={styles.eventImage}>{event.image}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
        <View style={styles.eventDetail}>
          <Ionicons name="calendar" size={14} color={COLORS.gray} />
          <Text style={styles.eventDetailText}>
            {event.date.getDate()}/{event.date.getMonth() + 1}
          </Text>
          <Ionicons name="time" size={14} color={COLORS.gray} style={styles.detailIcon} />
          <Text style={styles.eventDetailText}>{event.time}</Text>
        </View>
        <View style={styles.eventDetail}>
          <Ionicons name="location" size={14} color={COLORS.gray} />
          <Text style={styles.eventDetailText} numberOfLines={1}>{event.location}</Text>
        </View>
        {event.price > 0 ? (
          <Text style={styles.eventPrice}>₪{event.price}</Text>
        ) : (
          <Text style={styles.eventFree}>כניסה חופשית</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  calendarContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  monthTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.sm,
  },
  weekDayText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
  },
  calendarDaySelected: {
    backgroundColor: COLORS.beige,
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: FONT_SIZES.md,
  },
  calendarDayTextBold: {
    fontWeight: 'bold',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.blue,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  eventsContainer: {
    flex: 1,
    padding: SPACING.lg,
  },
  upcomingTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.beige,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
  },
  eventImage: {
    fontSize: 40,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  eventDetailText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    marginRight: SPACING.xs,
  },
  detailIcon: {
    marginRight: SPACING.md,
  },
  eventPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.green,
    marginTop: SPACING.xs,
  },
  eventFree: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.green,
    marginTop: SPACING.xs,
  },
});
