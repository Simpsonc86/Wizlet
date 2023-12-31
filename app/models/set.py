from .db import db, environment, SCHEMA, add_prefix_for_prod

class Set(db.Model):
    __tablename__ = 'sets'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    folder_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("folders.id")))
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(2000), nullable = False)

    #Relationship attributes
    user = db.relationship("User", back_populates= "sets")
    folder = db.relationship("Folder", back_populates = "sets")
    questions = db.relationship("Question", back_populates="set",cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "folder_id":self.folder_id,
            "title":self.title,
            "description":self.description,      
            "questions":[question.to_dict() for question in self.questions]        
        }