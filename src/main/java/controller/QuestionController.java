package controller;

import beans.Question;
import beans.Quiz;
import dao.QuestionDAO;

import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Daniel Klock
 * @version 1.2.1
 *
 * Controller class for questions, manages the logic related to questions for
 * CRUD operations. Manages temporal storage, and updating and retrieving
 * data from database through a DAO for questions.
 */
public class QuestionController {
    private static final QuestionDAO questionDAO = new QuestionDAO(); // TODO: Implement a database solution.
    private static int lastId = 0;
    private static final Map<Integer, Question> questions = new HashMap<>();

    /**
     * Get all questions.
     *
     * @return A {@code List} of all questions.
     */
    public static List<Question> getQuestions() {
        // TODO: Check database for new or newly modified questions.

        List<Question> list = new ArrayList<>();
        list.addAll(questions.values());
        return list;
    }

    /**
     * Get all questions within a quiz.
     *
     * @param quizId - The ID of the quiz to get questions from.
     * @throws NotFoundException - If the quiz with the given ID is not found.
     * @return A {@code List} of questions.
     */
    public static List<Question> getQuestions(int quizId) {
        Quiz quiz = QuizController.getQuiz(quizId);
        if (quiz == null) {
            throw new NotFoundException("Could not find a quiz with the given ID of " + quizId + ".");
        }

        return quiz.getQuestions();
    }

    /**
     * Get a question given an ID.
     *
     * @param id - The ID of the question.
     * @return A {@code Question}.
     * @throws NotFoundException - If a question with the given ID is not found.
     */
    public static Question getQuestion(int id) {
        // TODO: Check database for new or newly modified quizzes.

        Question question = questions.get(id);
        if (question == null) {
            throw new NotFoundException("Could not find a question with the given ID of " + id + ".");
        }
        return question;
    }

    /**
     * Create a new question.
     *
     * @param question - The question to create.
     */
    public static void createQuestion(Question question) {
        if (question == null) {
            throw new NullPointerException("Question object can not be null.");
        }

        question.setId(++lastId);

        // TODO: Update database with new question.
        questions.putIfAbsent(question.getId(), question);
    }

    /**
     * Create a new question linked to an existing quiz.
     *
     * @param id        - The ID of the quiz to find.
     * @param question  - The question to add to the quiz.
     * @throws NullPointerException - If the {@code Question} object is {@code null}.
     * @throws NotFoundException    - If a quiz with the given ID is not found.
     */
    public static void createQuestion(int id, Question question) {
        if (question == null) {
            throw new NullPointerException("Question object can not be null.");
        }

        question.setId(++lastId);

        // Check that quiz with given ID exists.
        Quiz quiz = QuizController.getQuiz(id);
        if (quiz == null) {
            throw new NotFoundException("Can not find a quiz with id of " + id + ".");
        }

        // TODO: Update database with new question.

        // Add question to quiz.
        quiz.getQuestions().add(question);

        // Update memory and database with new information.
        QuizController.updateQuiz(quiz.getId(), quiz);
        questions.putIfAbsent(question.getId(), question);
    }

    /**
     * Update a question.
     *
     * @param id        - The ID of the question to update.
     * @param question  - Question bean to store the new data.
     * @throws NullPointerException - If the {@code Question} object is {@code null}.
     * @throws NotFoundException    - If a question with the given ID is not found.
     */
    public static void updateQuestion(int id, Question question) {
        if (question == null) {
            throw new NullPointerException("Question object can not be null.");
        }

        Question found = questions.get(id);
        if (found == null) {
            throw new NotFoundException("Can not find a question with id of " + id + ".");
        }

        // Get new data.
        String newQuestion = question.getQuestion();
        String imageURL = question.getImageURL();
        List<String> answers = question.getAnswers();
        int points = question.getPoints();
        int correctAnswerIndex = question.getCorrectAnswerIndex();
        int duration = question.getDuration();

        // Update with new information if available.
        found.setQuestion((newQuestion != null) ? newQuestion : found.getQuestion());
        found.setImageURL((imageURL != null) ? imageURL : found.getImageURL());
        found.setAnswers((answers != null) ? answers : found.getAnswers());
        found.setPoints((points > -1) ? points : found.getPoints());
        found.setCorrectAnswerIndex((correctAnswerIndex > -1) ? correctAnswerIndex : found.getCorrectAnswerIndex());
        found.setDuration((duration > 10) ? duration : found.getDuration());

        // TODO: Update database with altered object.
        questions.put(id, found);
    }

    /**
     * Delete a question given a ID.
     *
     * @param id - The ID of the question to delete.
     */
    public static void deleteQuestion(int id) {
        // TODO: Remove question from database.
        questions.remove(id);
    }

    /**
     * Delete a question given an ID and a quiz ID.
     * @param quizId        - The ID of the quiz to delete a question for.
     * @param questionId    - The ID of the question to delete.
     */
    public static void deleteQuestion(int quizId, int questionId) {
        // Check that quiz with given ID exists.
        Quiz quiz = QuizController.getQuiz(quizId);
        if (quiz == null) {
            throw new NotFoundException("Can not find a quiz with id of " + quizId + ".");
        }

        quiz.getQuestions().remove(questionId);

        deleteQuestion(questionId);
    }
}
