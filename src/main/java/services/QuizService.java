package services;

import beans.Quiz;
import controller.QuizController;
import rest.PATCH;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 2.3.3
 *
 * REST service class that defines operations available for the Quiz resource.
 * This class defines those operations based on the CRUD standard.
 */
@Path("/quizzes/")
public class QuizService {
    /**
     * List all quizzes.
     * @return A {@code List} that contains all the {@code Quiz} objects,
     *         on the server. This list is converted to JSON by Jax-RS.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Quiz> getQuizzes() {
        return QuizController.getQuizzes();
    }

    /**
     * Get a specific quiz given a id.
     * @param quizId - The id of the desired {@code Quiz} object.
     * @return A {@code Quiz} object or {@code null} if not found.
     */
    @GET
    @Path("/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") int quizId) {
        return QuizController.getQuiz(quizId);
    }

    /**
     * Create a new quiz.
     * @param quiz - The quiz to add to the database.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createQuiz(Quiz quiz) {
        QuizController.createQuiz(quiz);
    }

    /**
     * Partially update a quiz.
     * @param id    - The ID of the quiz to update.
     * @param quiz  - Quiz bean to store the new data.
     */
    @PATCH
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void partiallyUpdateQuiz(@PathParam("quizId") int id, Quiz quiz) {
        QuizController.updateQuiz(id, quiz, true);
    }

    /**
     * Update the data of an existing quiz.
     * @param quizId    - The id of the quiz to change.
     * @param quiz      - The new {@code Quiz} object.
     */
    @PUT
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateQuiz(@PathParam("quizId") int quizId, Quiz quiz) {
        QuizController.updateQuiz(quizId, quiz, false);
    }

    /**
     * Delete a quiz.
     * @param quizId - The id of the quiz to delete.
     */
    @DELETE
    @Path("/{quizId}")
    public void deleteQuiz(@PathParam("quizId") int quizId) {
        QuizController.deleteQuiz(quizId);
    }
}
