class SleepRepository {
  constructor(data) {
    this.userSleep = data;
  }

  getUserSleepInfo(id) {
    return this.userSleep.filter(user => {
      return user.userID === id;
    })
  }

  getUsersAvgSleepQual() {
    let avgQual = this.userSleep.reduce((acc, day) => {
      return acc += day.sleepQuality;
    }, 0)
    return parseFloat((avgQual / this.userSleep.length).toFixed(1));
  }

  getUsersForAWeek(date) {
    let selectedDay = this.userSleep.find(day => {
      return day.date === date;
    })

    let indexOfSelectedDay = this.userSleep.indexOf(selectedDay);

    let weekArray = this.userSleep.slice((indexOfSelectedDay - 6 * 5), (indexOfSelectedDay + 5));
    // must change for larger data set

      return weekArray;
    }

    getUserAndSleepQualObj(date) {
      let weekObj = this.getUsersForAWeek(date);
      return weekObj.reduce((acc, obj) => {
          if (!acc[obj.userID]) {
            acc[obj.userID] = [];
          }
          acc[obj.userID].push(obj.sleepQuality)
          return acc;
        }, {});
      }

    getUsersWithSleepQualAvgAboveThree(date) {
      let weekObj = this.getUserAndSleepQualObj(date);
      let goodSleepArray = [];
      for(let key in weekObj) {
        let result = weekObj[key].reduce((acc, el) => {
          return acc += el;
        }, 0)
        let resultAvg = result / weekObj[key].length;
        if (resultAvg >= 3){
          goodSleepArray.push(key)
        }
      }
      return goodSleepArray;
    }

    getUsersForADay(date) {
      let arrayOfUsersByDay = this.userSleep.filter(day => {
        return day.date === date;
      })
      return arrayOfUsersByDay;
    }

    sortUsersByHoursSlept(date) {
      let usersArray = this.getUsersForADay(date);
      return usersArray.sort((a, b) => {
        return (a.hoursSlept - b.hoursSlept);
      })
    }

    getUsersWhoSleptMostForADay(date) {
      let sortedUsersArray = this.sortUsersByHoursSlept(date);
      return sortedUsersArray.filter((user) => {
        return user.hoursSlept ===
        sortedUsersArray[sortedUsersArray.length - 1].hoursSlept;
      })
    }

    getUsersAvgHoursSlept() {
      let avgQual = this.userSleep.reduce((acc, day) => {
        return acc += day.hoursSlept;
      }, 0)
      return parseFloat((avgQual / this.userSleep.length).toFixed(1));
    }

  } //end


if (typeof module !== "undefined") {
  module.exports = SleepRepository;
}
