import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { GroupDTO } from '@dtos/GroupDTO'
import firestore from '@react-native-firebase/firestore'

const userCollection = firestore().collection('user').doc('1')

async function addWorkoutByGroup(data: ExerciseDTO) {
  try {
    userCollection
      .collection('muscleGroups')
      .doc('1')
      .collection('workouts')
      .add(data)
  } catch (error) {
    throw error
  }
}

async function getWorkoutsByIdGroup(idGroup: string): Promise<ExerciseDTO[]> {
  try {
    const querySnapshot = await userCollection
      .collection('muscleGroups')
      .doc(idGroup)
      .collection('workouts')
      .get()

    const exercises: ExerciseDTO[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data() as ExerciseDTO
      exercises.push({
        id: doc.id,
        name: data.name,
        repetitions: data.repetitions,
        series: data.series,
      })
    })

    return exercises
  } catch (error) {
    throw error
  }
}

async function getGroups(): Promise<GroupDTO[]> {
  try {
    const querySnapshot = await userCollection.collection('muscleGroups').get()
    const groups: GroupDTO[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as GroupDTO
      groups.push({
        id: doc.id,
        name: data.name,
      })
    })

    return groups
  } catch (error) {
    throw error
  }
}

export { addWorkoutByGroup, getWorkoutsByIdGroup, getGroups }
