package controller;

import beans.Player;
import beans.Question;
import beans.Quiz;
import dao.QuizDAO;

import javax.ws.rs.NotFoundException;
import java.util.*;

/**
 * @author Daniel Klock
 * @version 2.3.3
 *
 * Controller class for quizzes, manages the logic related to quizzes for CRUD
 * operations. Manages temporal storage, and updating and retrieving data from
 * database through a DAO for quizzes.
 */
public class QuizController {
    private static final QuizDAO quizDAO = new QuizDAO(); // TODO: Implement a database solution.
    private static int lastId = 0;
    private static final Map<Integer, Quiz> quizzes = new HashMap<>();

    /**
     * Get all quizzes.
     * @return A {@code List} of all quizzes.
     */
    public static List<Quiz> getQuizzes() {
        // TODO: Check database for new or newly modified quizzes.

        List<Quiz> list = new ArrayList<>();
        list.addAll(quizzes.values());
        return list;
    }

    /**
     * Get a quiz given an ID.
     * @param id - The ID of the quiz.
     * @throws NotFoundException - If a quiz with the given ID was not found.
     * @return A {@code Quiz}.
     */
    public static Quiz getQuiz(int id) {
        // TODO: Check database for new or newly modified quizzes.

        Quiz quiz = quizzes.get(id);
        if (quiz == null) {
            throw new NotFoundException("Could not find a quiz with the given ID of " + id + ".");
        }
        return quiz;
    }

    /**
     * Create a new quiz given a quiz java bean.
     * @param quiz - The java bean to base the new quiz on.
     * @throws NullPointerException - If the {@code Quiz} object is null.
     */
    public static void createQuiz(Quiz quiz) {
        if (quiz == null) {
            throw new NullPointerException("Quiz object can not be null.");
        }

        quiz.setId(++lastId);
        List<Question> questions = quiz.getQuestions();
        for (Question question : questions) {
            QuestionController.createQuestion(question);
        }

        // TODO: Create quiz in database.
        quizzes.putIfAbsent(quiz.getId(), quiz);
    }

    /**
     * Update a quiz with new data.
     * @param id        - The id of the quiz to update.
     * @param quiz      - Quiz bean to store the new data.
     * @param noRemove  - Use noRemove to avoid removing data in the Quiz object.
     * @throws NullPointerException - If {@code Quiz} is null.
     * @throws NotFoundException - If a quiz with the given ID is not found.
     */
    public static void updateQuiz(int id, Quiz quiz, boolean noRemove) {
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
        Date startTime = quiz.getStartTime();
        List<Question> questions = quiz.getQuestions();
        List<Player> playerList = quiz.getPlayerList();

        // No remove mode, means to not remove any data only add.
        if (noRemove) {
            // Update with new information if available.
            found.setName((name != null) ? name : found.getName());
            found.setCreator((creator != null) ? creator : found.getCreator());
            found.setStartTime((startTime != null) ? startTime : found.getStartTime());

            List<Question> foundQuestions = found.getQuestions();
            if (questions != null && foundQuestions != null) {
                // Add new questions and update existing ones.
                for (Question question : questions) {
                    if (!foundQuestions.contains(question)) {
                        foundQuestions.add(question);
                    } else {
                        int index = foundQuestions.indexOf(question);
                        foundQuestions.set(index, question);
                    }
                }
            } else if (questions != null) {
                found.setQuestions(questions);
            }

            List<Player> foundPlayerList = found.getPlayerList();
            if (playerList != null && foundPlayerList != null) {
                // Add new players and update existing ones.
                for (Player player : playerList) {
                    if (!foundPlayerList.contains(player)) {
                        foundPlayerList.add(player);
                    } else {
                        int index = foundPlayerList.indexOf(player);
                        foundPlayerList.set(index, player);
                    }
                }
            } else if (playerList != null) {
                found.setPlayerList(playerList);
            }
        } else {
            found = quiz;
            found.setId(id);
        }

        // TODO: Update database with altered object.
        quizzes.put(id, found);
    }

    /**
     * Delete a quiz given a ID.
     * @param id - The ID of the quiz to delete.
     */
    public static void deleteQuiz(int id) {
        Quiz quiz = quizzes.get(id);
        if (quiz != null) {
            List<Question> questions = quiz.getQuestions();
            if (questions != null) {
                for (Question question : questions) {
                    QuestionController.deleteQuestion(question.getId());
                }
            }

            // TODO: Remove quiz from database.
            quizzes.remove(id);
        }
    }
}