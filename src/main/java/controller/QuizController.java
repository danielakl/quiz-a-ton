package controller;

import beans.Quiz;
import dao.QuizDAO;

import javax.ws.rs.NotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Daniel Klock
 * @version 1.1.0
 *
 * Controller class for quizzes, manages the logic related to quizzes for CRUD
 * operations. Manages temporal storage, and updating and retrieving data from
 * database through a DAO for quizzes.
 */
public class QuizController {
    private static final QuizDAO quizDAO = new QuizDAO(); // TODO: Implement a database solution.
    private static final Map<Integer, Quiz> quizzes = new HashMap<>();

    /**
     * Get all quizzes.
     *
     * @return A {@code List} of all quizzes.
     */
    public List<Quiz> getQuizzes() {
        // TODO: Check database for new or newly modified quizzes.

        List<Quiz> list = new ArrayList<>();
        list.addAll(quizzes.values());
        return list;
    }

    /**
     * Get a quiz given an ID.
     *
     * @param id - The ID of the quiz.
     * @throws NotFoundException - If a quiz with the given ID was not found.
     * @return A {@code Quiz}.
     */
    public Quiz getQuiz(int id) {
        // TODO: Check database for new or newly modified quizzes.

        Quiz quiz = quizzes.get(id);
        if (quiz == null) {
            throw new NotFoundException("Could not find a quiz with the given ID of " + id + ".");
        }
        return quiz;
    }

    /**
     * Create a new quiz given a quiz java bean.
     *
     * @param quiz - The java bean to base the new quiz on.
     */
    public void createQuiz(Quiz quiz) {
        // TODO: Create quiz in database.
        quizzes.putIfAbsent(quiz.getId(), quiz);
    }

    /**
     * Update a quiz with new data.
     *
     * @param id    - The id of the quiz to update.
     * @param quiz  - Quiz bean to store the new data.
     */
    public void updateQuiz(int id, Quiz quiz) {
        if (quiz == null) {
            throw new NullPointerException("Quiz object can not be null.");
        }

        Quiz found = quizzes.get(id);
        if (found == null) {
            throw new NotFoundException("Can not find a quiz with id of " + id + ".");
        }

        // Get new data.
        String name = quiz.getName();
        String creator = quiz.getCreator();
        LocalDateTime startTime = quiz.getStartTime();
        List<Integer> questions = quiz.getQuestions();
        Map<String, Integer> scoreBoard = quiz.getScoreBoard();

        // Update with new information if available.
        found.setName((name != null) ? name : found.getName());
        found.setCreator((creator != null) ? creator : found.getCreator());
        found.setStartTime((startTime != null) ? startTime : found.getStartTime());
        found.setQuestions((questions != null) ? questions : found.getQuestions());
        found.setScoreBoard((scoreBoard != null) ? scoreBoard : quiz.getScoreBoard());

        // TODO: Update database with altered object.
        quizzes.put(id, found);
    }

    /**
     * Delete a quiz given a ID.
     *
     * @param id - The ID of the quiz to delete.
     */
    public void deleteQuiz(int id) {
        // TODO: Remove quiz from database.
        quizzes.remove(id);
    }
}