import MySQLdb
import datetime

class Database:

    host = 'localhost'
    user = 'lazylad'
    password = 'password'
    db = 'lazylad'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def insert(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except:
            self.connection.rollback()



    def query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()


if __name__ == "__main__":

    db = Database()


    # Data Insert into the table
    query = """
        INSERT INTO restaurant_dish
        (`created_at`, `dish_name`,'description','price','image_url','restaurant_id')
        VALUES
        (datetime.now(), 'momo','tato tato momo ra tato tato soup','120','https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/10/0/DV2802_Nepali-Momo_s4x3.jpg.rend.hgtvcom.616.462.suffix/1515644556794.jpeg',1)
        """

    # db.query(query)
    db.insert(query)


