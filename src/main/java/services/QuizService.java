package services;

import beans.Quiz;
import controller.QuizController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 1.1.1
 *
 * REST service class that defines operations available for the Quiz resource.
 * This class defines those operations based on the CRUD standard.
 */
@Path("/quiz/")
public class QuizService {
    private static final QuizController quizController = new QuizController();

    /**
     * List all quizzes.
     * @return A {@code List} that contains all the {@code Quiz} objects,
     *         on the server. This list is converted to JSON by Jax-RS.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Quiz> getQuizzes() {
        return quizController.getQizzes();
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
        return quizController.getQuiz(quizId);
    }

    /**
     * Create a new quiz.
     * @param quiz - The quiz to add to the database.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createQuiz(Quiz quiz) {
        quizController.createQuiz(quiz);
    }

    /**
     * Update the data of an existing quiz.
     * @param quizId    - The id of the quiz to change.
     * @param quiz  - The new {@code Quiz} object.
     */
    @PUT
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateQuiz(@PathParam("quizId") int quizId, Quiz quiz) {
        quizController.updateQuiz(quizId, quiz);
    }

    /**
     * Delete a quiz.
     * @param quizId - The id of the quiz to delete.
     */
    @DELETE
    @Path("/{quizId}")
    public void deleteQuiz(@PathParam("quizId") int quizId) {
        quizController.deleteQuiz(quizId);
    }
}
