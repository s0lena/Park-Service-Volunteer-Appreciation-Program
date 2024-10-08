import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from "./raccoon-meadows-log";

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from "./wolf-point-log";

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
  id: number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
  return volunteers.map((volunteer) => {
    let id = volunteer.id;
    if (typeof id === "string") {
      id = parseInt(id, 10);
    }

    return {
      ...volunteer,
      id: id,
    };
  });
}

function isVerified(verified: string | boolean) {
  if (typeof verified === "string") {
    return verified === "Yes" ? true : false;
  }
  return verified;
}

function getHours(activity: CombinedActivity) {
  if ("hours" in activity) {
    return activity.hours;
  } else {
    return activity.time;
  }
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity) => {
      let verified = isVerified(activity.verified);
      if (verified) {
        hours = hours + getHours(activity);
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

// function to sort by number of hours
function byHours(a, b) {
  return b.hours - a.hours;
}
const combinedVolunteers = combineVolunteers(
  [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);
console.log(combinedVolunteers);

const result = calculateHours(combinedVolunteers);

console.log(result.sort(byHours));

// return {
//   id: id,
//   name: volunteer.name,
//   avtivities: volunteer.activities,
// };
