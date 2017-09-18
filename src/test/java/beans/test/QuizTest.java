package beans.test;

import beans.Question;
import beans.Quiz;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 0.1.0
 */
public class QuizTest {
    private final Quiz quiz = new Quiz();
    private final Question question = new Question();
    private final List<Question> questions = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        quiz.setId(1);
        quiz.setDuration(100);
        questions.add(question);
        quiz.setQuestions(questions);
    }

    /**
     * If this test passes the {@code setId()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getId() throws Exception {
        Assert.assertEquals(1, quiz.getId());
    }

    /**
     * If this test passes the {@code setDuration()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getDuration() throws Exception {
        Assert.assertEquals(100, quiz.getDuration());
    }

    /**
     * If this test passes the {@code setQuestions()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getQuestions() throws Exception {
        Assert.assertArrayEquals(questions.toArray(), quiz.getQuestions().toArray());
    }
}
