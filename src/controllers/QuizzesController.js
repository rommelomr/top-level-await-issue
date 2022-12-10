import { QuizService } from '/@src/modules/quiz/quiz/services/Quiz.services'
export const getAllQuizzesToSelect = async () => {

    let response = await QuizService.getAll()
    let array = []
    response.data.map((x)=>{
        array.push({
            label:x.name,
            value:x.id
        })
    })
    return array

}