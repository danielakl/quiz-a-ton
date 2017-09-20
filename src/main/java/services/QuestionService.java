package services;

import beans.Question;
import beans.Quiz;
import controller.QuizController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 0.1.0
 *
 * REST service class that defines operations available for the Question resource.
 * This class defines those operations based on the CRUD standard.
 */
@Path("/quiz/{quizId}/question/")
public class QuestionService {
    private static final QuizController quizController = new QuizController();

    /**
     * List all questions for a given quiz.
     *
     * @param quizId - The ID of the quiz to get the questions from.
     * @return A {@code List} that contains all the {@code Question} objects,
     * within a given quiz. This list is converted to JSON by Jax-RS.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Question> getQuestions(@PathParam("quizId") int quizId) {
        return quizController.getQuestions(quizId);
    }

    /**
     * Get a question for a quiz given the id of the question.
     *
     * @param quizId        - The ID of the quiz.
     * @param questionId    - The ID of the question.
     * @return A {@code Question} object or {@code null} if not found.
     */
    @GET
    @Path("/{questionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Question getQuestion(@PathParam("quizId") int quizId, @PathParam("questionId") int questionId) {
        return quizController.getQuestion(quizId, questionId);
    }

    /**
     * Create a new question.
     *
     * @param quizId    - The
     * @param question
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createQuestion(@PathParam("quizId") int quizId, Question question) {
        quizController.createQuestion(quizId, question);
    }

    @PUT
    @Path("/{questionId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateQuestion(@PathParam("quizId") int quizId, @PathParam("questionId") int quiestionId, Question question) {
        quizController.updateQuestion(quizId, quiestionId, question);
    }

    @DELETE
    @Path("/{questionId}")
    public void deleteQuestion(@PathParam("questionId") int questionId) {
        quizController.deleteQuestion(questionId);
    }
}
