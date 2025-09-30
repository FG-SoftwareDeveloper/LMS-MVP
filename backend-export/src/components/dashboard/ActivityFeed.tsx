import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'course_completed' | 'achievement' | 'game_score' | 'lesson_completed' | 'badge_earned';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className={`${activity.bgColor} p-2 rounded-full flex-shrink-0`}>
            <activity.icon className={`h-4 w-4 ${activity.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;