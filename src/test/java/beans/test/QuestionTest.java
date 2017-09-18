package beans.test;

import beans.Question;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 0.1.0
 */
public class QuestionTest {
    private static final Question question = new Question();
    private static final List<String> answers = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        question.setId(1);
        question.setQuestion("Quiz question.");
        question.setAnswers(answers);
        question.setCorrectAnswerIndex(0);
    }

    /**
     * If this test passes the {@code setId()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getId() throws Exception {
        Assert.assertEquals(1, question.getId());
    }

    /**
     * If this test passes the {@code setQuestion()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getQuestion() throws Exception {
        Assert.assertEquals("Quiz question.", question.getQuestion());
    }

    /**
     * If this test passes the {@code setAnswers()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getAnswers() throws Exception {
        Assert.assertArrayEquals(answers.toArray(), question.getAnswers().toArray());
    }

    /**
     * If this test passes the {@code setCorrectAnswerIndex()} method also works.
     * @throws Exception - Throws any exceptions.
     */
    @Test
    public void getCorrectAnswerIndex() throws Exception {
        Assert.assertEquals(0, question.getCorrectAnswerIndex());
    }
}
