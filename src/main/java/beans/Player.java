package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;

/**
 * @author Daniel Klock
 * @version 0.2.0
 *
 * Player bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Player implements Serializable {
    @XmlElement(name = "nickname")
    private String nickname = "Anonymous";

    @XmlElement(name = "points")
    private int points = 0;

    /*
     * Getters
     */
    public String getNickname() {
        return nickname;
    }

    public int getPoints() {
        return points;
    }

    /*
     * Setters
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }

        if (!(obj instanceof Player)) {
            return false;
        }

        Player player = (Player) obj;
        return player.getNickname() != null && player.getNickname().equals(nickname);
    }
}
