package services;

import beans.Quiz;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Daniel Klock
 * @version 0.1.1
 *
 * REST service class that defines operations available for the Quiz resource.
 * This class defines those operations based on the CRUD standard.
 */
@Path("/quiz/")
public class QuizService {
    // TODO: Implement a database solution.
    // TODO: Implement authorization and authentication.
    private static final Map<Integer, Quiz> quizzes = new HashMap<>();

    /**
     * List all quizzes.
     * @return Returns a {@code List} that contains all the {@code Quiz} objects,
     *         on the server. This list is converted to JSON by Jax-RS.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Quiz> getQuizzes() {
        List<Quiz> list = new ArrayList<>();
        list.addAll(quizzes.values());
        return list;
    }

    /**
     * Get a specific quiz given a id.
     * @param id - The id of the desired {@code Quiz} object.
     * @throws NotFoundException - No quiz with the given id was not found.
     * @return A {@code Quiz} object.
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("id") int id) {
        Quiz quiz = quizzes.get(id);
        if (quiz == null) {
            throw new NotFoundException("A Quiz with id of " + id + ", was not found.");
        }
        return quiz;
    }

    /**
     * Create a new quiz.
     * @param quiz - The quiz to add to the database.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createQuiz(Quiz quiz) {
        Quiz found = quizzes.get(quiz.getId());
        if (found == null) {
            quizzes.put(quiz.getId(), quiz);
        }
    }

    /**
     * Update the data of an existing quiz.
     * @throws NotFoundException - If the given id is not found in the database.
     * @param id    - The id of the quiz to change.
     * @param quiz  - The new {@code Quiz} object.
     */
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateQuiz(@PathParam("id") int id, Quiz quiz) {
        Quiz found = quizzes.get(id);
        if (found == null) {
            throw new NotFoundException("Could not find a quiz with id " + id + ".");
        }
        found.setDuration(quiz.getDuration());
        found.setQuestions(quiz.getQuestions());
        quizzes.put(id, found);
    }

    /**
     * Delete a quiz.
     * @param id - The id of the quiz to delete.
     */
    @DELETE
    @Path("/{id}")
    public void deleteQuiz(@PathParam("id") int id) {
        quizzes.remove(id);
    }
}
